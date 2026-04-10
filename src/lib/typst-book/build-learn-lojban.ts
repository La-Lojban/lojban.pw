/**
 * Build Learn Lojban (and future books) PDF via: markdown → site HTML → Pandoc → Typst → PDF.
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import matter from "gray-matter";
import markdownToHtml from "../markdownToHtml";
import { patchBodyTypFloatFigures } from "./patch-body-float-figures";
import {
  blockquoteEmSpanBlockLines,
  extractDataUriImagesToFiles,
  extractMermaidSvgDivsToImages,
  normalizeFontColorTags,
  replaceMissingImageSrcs,
  rewriteAssetUrlsForTypstProjectRoot,
  stripPrintHidden,
} from "./prepare-html";

/** `src/lib/typst-book` → repository root */
function findProjectRoot(): string {
  const dir = path.resolve(__dirname, "..", "..", "..");
  if (!fs.existsSync(path.join(dir, "data", "pages"))) {
    throw new Error(`Cannot find project root (missing data/pages): ${dir}`);
  }
  return dir;
}

export interface BuildBookTypstOptions {
  /** Absolute path to the book index .md (e.g. .../data/pages/en/books/learn-lojban.md) */
  bookMdPath: string;
  /** Output PDF path */
  outPdfPath: string;
  /** Directory for intermediate .typ / body (default: next to PDF) */
  workDir?: string;
  /** Pandoc binary */
  pandoc?: string;
  /** Typst binary */
  typst?: string;
}

/**
 * Pandoc emits `#horizontalrule`; included `body.typ` does not inherit `main.typ` imports.
 */
function patchBodyTypFile(bodyTypPath: string): void {
  let s = fs.readFileSync(bodyTypPath, "utf8");
  const hr = `#v(0.35em)
#line(length: 100%, stroke: 0.6pt + rgb("#cbd5e1"))
#v(0.35em)`;
  s = s.replace(/^#horizontalrule\s*$/gm, hr);
  // Pandoc html→typst emits per-table inset + align; those override `#set table(...)` in the template
  // so article table styling (site CSS parity) never applies unless we strip them.
  s = s.replace(/\n\s*inset:\s*6pt,\s*/g, "\n");
  s = s.replace(
    /\n\s*align:\s*\(col,\s*row\)\s*=>\s*\(auto,auto,\)\.at\(col\),\s*/g,
    "\n"
  );
  // Pandoc html→typst: `<img width="663">` becomes `#box(width: 663, …)`; Typst needs a unit.
  s = s.replace(/#box\(width: (\d+),/g, "#box(width: $1pt,");
  // Article book print: two-column tables 50%/50% (`index.css` .book-print-content … :has(…2…last))
  s = s.replace(/columns:\s*2(\s*,)/g, "columns: (1fr, 1fr)$1");
  // Mermaid `<img width>` values are CSS px from `extractMermaidSvgDivsToImages`; Pandoc
  // labels them `Npt` but N is still px → huge layout width. Convert px→pt (72/96) and cap
  // to body inner width (same 210mm − 2×11mm as `learn-lojban/template.typ` / prepare-html).
  const bookInnerWidthMm = 210 - 2 * 11;
  const maxMermaidWidthPt = (bookInnerWidthMm / 25.4) * 72;
  s = s.replace(
    /#box\(width: (\d+(?:\.\d+)?)pt,\s*image\("([^"]*mermaid-\d+\.png)"\)\)/gi,
    (_m, wStr: string, imgPath: string) => {
      const nPx = parseFloat(wStr);
      let wPt = nPx * (72 / 96);
      if (wPt > maxMermaidWidthPt) wPt = maxMermaidWidthPt;
      const rounded = Math.round(wPt * 10) / 10;
      return `#align(center)[#box(width: ${rounded}pt, image("${imgPath}"))]`;
    }
  );
  fs.writeFileSync(bodyTypPath, s, "utf8");
}

/**
 * FNV-1a 32-bit hash of the book title. Drives Typst brand palette and cover variation
 * (`resolve-brand` in brandbooks.typ); same title always yields the same PDF chrome.
 */
export function hashBookTitle(title: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < title.length; i++) {
    h ^= title.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

/** Matches `brandbooks.typ` `brands` order (n-brands = 6). */
const BOOK_PALETTE_COUNT = 6;

const BOOK_PALETTE_BY_NAME: Record<string, number> = {
  ember: 0,
  forest: 1,
  tide: 2,
  /** Cornflower / steel blue; same slot as `tide`. */
  cornflower: 2,
  plum: 3,
  sienna: 4,
  arctic: 5,
  /** Steel-blue family; same slot as `tide`. */
  blue: 2,
};

/**
 * Reads optional YAML `palette` on the book index .md (name, alias, or 0..5).
 * Returns `null` to use Typst hash fallback (`calc.rem(title-hash, 6)`).
 */
export function paletteIndexFromBookFrontmatter(data: {
  palette?: unknown;
}): number | null {
  const raw = data.palette;
  if (raw === undefined || raw === null || raw === "") return null;
  if (typeof raw === "number") {
    if (!Number.isFinite(raw) || !Number.isInteger(raw)) {
      console.warn(
        `Invalid book palette (expected integer 0–${BOOK_PALETTE_COUNT - 1}): ${String(raw)}; using title-hash fallback.`
      );
      return null;
    }
    if (raw < 0 || raw >= BOOK_PALETTE_COUNT) {
      console.warn(
        `Book palette index out of range (0–${BOOK_PALETTE_COUNT - 1}): ${raw}; using title-hash fallback.`
      );
      return null;
    }
    return raw;
  }
  if (typeof raw === "string") {
    const k = raw.trim().toLowerCase();
    if (k in BOOK_PALETTE_BY_NAME) return BOOK_PALETTE_BY_NAME[k]!;
    console.warn(
      `Unknown book palette "${raw}" (ember, forest, tide, cornflower, plum, sienna, arctic, blue); using title-hash fallback.`
    );
    return null;
  }
  console.warn(
    `Invalid book palette type: ${String(raw)}; using title-hash fallback.`
  );
  return null;
}

function run(cmd: string, args: string[], cwd: string): void {
  const r = spawnSync(cmd, args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error(`${cmd} ${args.join(" ")} failed with ${r.status}`);
  }
}

export async function buildBookTypst(
  options: BuildBookTypstOptions
): Promise<void> {
  const projectRoot = findProjectRoot();
  const { bookMdPath, outPdfPath } = options;
  const pandoc = options.pandoc ?? "pandoc";
  const typst = options.typst ?? "typst";

  const publicAssetsDir = path.join(projectRoot, "data", "assets");
  if (!fs.existsSync(publicAssetsDir)) {
    throw new Error(`Assets directory missing: ${publicAssetsDir}`);
  }

  // Keep work dir under the repo so `typst` (e.g. snap) can read paths reliably.
  const defaultWork = path.join(
    projectRoot,
    "tmp",
    "typst-book",
    path.basename(bookMdPath, ".md")
  );
  const workDir = options.workDir ?? defaultWork;
  fs.mkdirSync(workDir, { recursive: true });

  let phaseMs = 0;
  const logPhase = (label: string) => {
    const t = Date.now();
    const elapsed = t - phaseMs;
    phaseMs = t;
    console.log(`[typst-book timing] ${label}: ${elapsed}ms`);
  };

  const raw = fs.readFileSync(bookMdPath, "utf8");
  const { data, content } = matter(raw);

  const title = (data.title as string) ?? "Book";
  const description = (data.description as string) ?? "";
  const coverImage = data.coverImage as string | undefined;
  let coverImageRel: string | null = null;
  if (coverImage?.startsWith("/assets/")) {
    const rel = coverImage.replace(/^\/assets\//, "");
    const abs = path.join(publicAssetsDir, rel);
    if (!fs.existsSync(abs)) {
      console.warn(`Cover image not found: ${abs}`);
    } else {
      const relToProj = path
        .relative(projectRoot, abs)
        .split(path.sep)
        .join("/");
      coverImageRel = relToProj.startsWith("/") ? relToProj : `/${relToProj}`;
    }
  }

  phaseMs = Date.now();
  const { text: htmlFragment } = await markdownToHtml({
    content,
    fullPath: bookMdPath,
    bookPdfMermaid: true,
    verboseBookBuild: true,
  });
  logPhase("markdownToHtml (total; see [typst-book md] lines above)");

  let html = stripPrintHidden(htmlFragment);
  html = normalizeFontColorTags(html);
  html = blockquoteEmSpanBlockLines(html);
  logPhase("stripPrintHidden + normalizeFontColorTags + blockquoteEmSpanBlockLines");

  html = await extractMermaidSvgDivsToImages(html, workDir, projectRoot, true);
  logPhase("mermaid rasterize (total; see [typst-book mermaid] lines above)");

  html = extractDataUriImagesToFiles(html, workDir, projectRoot);
  logPhase("extractDataUriImagesToFiles");
  html = rewriteAssetUrlsForTypstProjectRoot(html, projectRoot, publicAssetsDir);
  logPhase("rewriteAssetUrlsForTypstProjectRoot");
  html = replaceMissingImageSrcs(html, projectRoot);
  logPhase("replaceMissingImageSrcs");

  const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"/></head><body>\n${html}\n</body></html>`;

  const bodyTypPath = path.join(workDir, "body.typ");
  const mainTypPath = path.join(workDir, "main.typ");
  const templateSrc = path.join(__dirname, "learn-lojban", "template.typ");
  const brandSrc = path.join(__dirname, "learn-lojban", "brandbooks.typ");

  if (!fs.existsSync(templateSrc)) {
    throw new Error(`Missing template: ${templateSrc}`);
  }
  if (!fs.existsSync(brandSrc)) {
    throw new Error(`Missing brandbooks: ${brandSrc}`);
  }
  fs.copyFileSync(templateSrc, path.join(workDir, "template.typ"));
  fs.copyFileSync(brandSrc, path.join(workDir, "brandbooks.typ"));

  const pandocInputPath = path.join(workDir, "pandoc-input.html");
  fs.writeFileSync(pandocInputPath, fullHtml, "utf8");
  console.log(
    `[typst-book] pandoc input: ${(fullHtml.length / 1024).toFixed(1)} KiB → ${pandocInputPath}`
  );

  const luaFilter = path.join(
    __dirname,
    "pandoc-filters",
    "typst-colors.lua"
  );
  run(
    pandoc,
    [
      "-f",
      "html",
      "-t",
      "typst",
      "--lua-filter",
      luaFilter,
      "-o",
      bodyTypPath,
      pandocInputPath,
    ],
    projectRoot
  );
  logPhase("pandoc html → body.typ");
  try {
    const bodyStr = fs.readFileSync(bodyTypPath, "utf8");
    const lines = bodyStr.split("\n").length;
    console.log(
      `[typst-book] body.typ: ${(Buffer.byteLength(bodyStr, "utf8") / 1024).toFixed(1)} KiB, ${lines} lines`
    );
  } catch {
    /* ignore */
  }

  console.log("[typst-book] patchBodyTypFile (horizontal rules, tables, mermaid width) …");
  const patchT0 = Date.now();
  patchBodyTypFile(bodyTypPath);
  console.log(`[typst-book] patchBodyTypFile done in ${Date.now() - patchT0}ms`);

  console.log(
    "[typst-book] patchBodyTypFloatFigures (#grid: text left, stacked pixra right) …"
  );
  const floatT0 = Date.now();
  {
    const bodyTyp = fs.readFileSync(bodyTypPath, "utf8");
    fs.writeFileSync(bodyTypPath, patchBodyTypFloatFigures(bodyTyp), "utf8");
  }
  console.log(`[typst-book] patchBodyTypFloatFigures done in ${Date.now() - floatT0}ms`);

  const coverArg = coverImageRel ? JSON.stringify(coverImageRel) : "none";
  const titleHash = hashBookTitle(title);
  const paletteIdx = paletteIndexFromBookFrontmatter(data);
  const paletteArg =
    paletteIdx === null ? "" : `  palette: ${paletteIdx},\n`;

  const mainTyp = `#import "template.typ": lojban-book

#lojban-book(
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  cover-image: ${coverArg},
  title-hash: ${titleHash},
${paletteArg})[
  #include "body.typ"
]
`;

  fs.writeFileSync(mainTypPath, mainTyp, "utf8");

  fs.mkdirSync(path.dirname(outPdfPath), { recursive: true });
  console.log(
    `[typst-book] typst compile starting → ${outPdfPath} (large books can take several minutes; no progress until Typst finishes)`
  );
  run(
    typst,
    ["compile", "--root", projectRoot, mainTypPath, outPdfPath],
    workDir
  );
  logPhase("typst compile (layout + fonts + images)");

  console.log(`Typst PDF written: ${outPdfPath}`);
}

async function main() {
  const projectRoot = findProjectRoot();
  const defaultBook = path.join(
    projectRoot,
    "data",
    "pages",
    "en",
    "books",
    "learn-lojban.md"
  );
  const argv = process.argv.slice(2);
  const bookMd = argv[0] ? path.resolve(argv[0]) : defaultBook;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getVrejiPath } = require("../paths");
  const vreji = getVrejiPath();
  const outPdf =
    argv[1] ?? path.join(vreji, "uencu", "en", "learn-lojban.pdf");

  await buildBookTypst({
    bookMdPath: bookMd,
    outPdfPath: outPdf,
  });
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
