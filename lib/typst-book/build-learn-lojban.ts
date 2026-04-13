/**
 * Build Learn Lojban (and future books) PDF via: markdown → site HTML → Pandoc → Typst → PDF.
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import matter from "gray-matter";
import markdownToHtml from "../markdownToHtml";
import {
  speakerBubblePaletteIndexFromTypstAvatarInner,
  typstSnippetContainsSpeakerAvatarImagePath,
} from "../expandFirstLojbanSpeakerTags";
import {
  endOfBracketContent,
  patchBodyTypFloatFigures,
  typstSpeakerRowRewrittenBlock,
} from "./patch-body-float-figures";
import {
  blockquoteEmSpanBlockLines,
  extractDataUriImagesToFiles,
  extractMermaidSvgDivsToImages,
  normalizeFontColorTags,
  replaceMissingImageSrcs,
  rewriteAssetUrlsForTypstProjectRoot,
  stripPrintHidden,
} from "./prepare-html";

/**
 * `lib/typst-book` → repository root (Next app and `data/` live at the same level).
 * In Docker, `data/pages` is mounted at `md_pages` (see Dockerfile / workflow); assets at
 * `public/assets`. Locally, pages live in `data/pages` and assets in `data/assets`.
 */
function findProjectRoot(): string {
  const dir = path.resolve(__dirname, "..", "..");
  const hasDataPages = fs.existsSync(path.join(dir, "data", "pages"));
  const hasMdPagesMount = fs.existsSync(path.join(dir, "md_pages"));
  if (!hasDataPages && !hasMdPagesMount) {
    throw new Error(
      `Cannot find project root (expected data/pages or md_pages): ${dir}`
    );
  }
  return dir;
}

function resolvePublicAssetsDir(projectRoot: string): string {
  const atData = path.join(projectRoot, "data", "assets");
  if (fs.existsSync(atData)) return atData;
  const atPublic = path.join(projectRoot, "public", "assets");
  if (fs.existsSync(atPublic)) return atPublic;
  throw new Error(
    `Assets directory missing (tried ${atData} and ${atPublic})`
  );
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
  /**
   * HTML after Mermaid rasterization (`workDir/extracted-media` must already exist).
   * When set, markdown → Mermaid is skipped (used by `print-all-books` after one Chromium batch).
   */
  htmlAfterMermaid?: string;
}

/**
 * Markdown → site HTML through blockquote prep, **before** Mermaid rasterization.
 * Each book uses its own `workDir` (created if missing).
 */
export async function prepareBookHtmlBeforeMermaid(options: {
  bookMdPath: string;
  workDir: string;
}): Promise<string> {
  const workDir = path.resolve(options.workDir);
  fs.mkdirSync(workDir, { recursive: true });

  const raw = fs.readFileSync(options.bookMdPath, "utf8");
  const { content } = matter(raw);

  const { text: htmlFragment } = await markdownToHtml({
    content,
    fullPath: options.bookMdPath,
    bookPdfMermaid: true,
    verboseBookBuild: true,
  });

  let html = stripPrintHidden(htmlFragment);
  html = normalizeFontColorTags(html);
  html = blockquoteEmSpanBlockLines(html);
  return html;
}

/** Repository root for Typst `--root` (same as `buildBookTypst`). */
export function getTypstBookProjectRoot(): string {
  return findProjectRoot();
}

/**
 * Pandoc html→typst can emit `#block[ … ][ #stack(…) … ]`, which Typst 0.14 rejects (“unexpected
 * argument”). `<speaker>` lesson layouts hit this; run after `patchBodyTypFloatFigures`.
 *
 * Lesson `#grid(…)[ … ][ #stack(…) … ]`: Pandoc sometimes omits the `][` cell boundary between
 * plain-text cell1 and a `#block` speaker column (`]\n]\n#block[`); that is fixed first.
 * Native `]\n]\n][\n  #stack` junctions must **not** be wrapped in a second grid.
 */
function patchBookLessonGridCellGlue(s: string): string {
  const lessonGridHead =
    "#grid(\n  columns: (1fr, auto),\n  gutter: 2.5mm,\n  align: (top + left, top + right),\n)[\n";
  const gluedSpeaker = "\n]\n]\n#block[\n\n#block[";
  let from = 0;
  for (let guard = 0; guard < 400; guard += 1) {
    const g = s.indexOf(lessonGridHead, from);
    if (g === -1) break;
    const cellStart = g + lessonGridHead.length;
    let p = cellStart;
    while (p < s.length && s[p] === "\n") p += 1;
    const cell1StartsBlock = s.startsWith("#block[", p);
    const nextGrid = s.indexOf(lessonGridHead, cellStart);
    const searchEnd = nextGrid === -1 ? s.length : nextGrid;
    const glueIdx = s.indexOf(gluedSpeaker, cellStart);
    if (glueIdx === -1 || glueIdx >= searchEnd) {
      from = g + 1;
      continue;
    }
    const cellSepIdx = s.indexOf("][\n", cellStart);
    const needsGlue =
      !cell1StartsBlock &&
      (cellSepIdx === -1 || cellSepIdx > glueIdx) &&
      glueIdx < searchEnd;
    if (needsGlue) {
      const insert = "\n]\n]\n][\n#block[\n\n#block[";
      s = s.slice(0, glueIdx) + insert + s.slice(glueIdx + gluedSpeaker.length);
      from = glueIdx + insert.length;
    } else {
      from = g + 1;
    }
  }
  return s;
}

function patchBookSpeakerTypstBody(bodyTypPath: string): void {
  let s = fs.readFileSync(bodyTypPath, "utf8");
  s = patchBookLessonGridCellGlue(s);
  const prefix = "#block[\n\n#block[\n";
  const stackOpen = "][\n  #stack(spacing: 0.55em)[";
  const stackCloseTail = ")\n  ]\n]\n";
  const stackCloseExpanded = ")\n  ]\n  ]\n]\n]\n";
  const stackCloseNested = ")\n  ]\n]\n]\n";
  const stackCloseLen = stackCloseTail.length;

  const alreadyExpandedClose = (j: number): boolean =>
    s.slice(j, j + stackCloseExpanded.length) === stackCloseExpanded ||
    s.slice(j, j + stackCloseNested.length) === stackCloseNested;

  const innerSiblingBlock = /\n\]\s*\n\]\s*\n#block\[/;
  const innerInvalid = (inner: string): boolean => {
    if (inner.includes(prefix)) return true;
    if (inner.includes(stackOpen)) return true;
    if (innerSiblingBlock.test(inner)) return true;
    // Gloss lines / examples (not a single speaker paragraph + stack).
    if (inner.includes('#text("/ ")')) return true;
    if (inner.includes("#quote(")) return true;
    return false;
  };

  let searchFrom = 0;
  for (let guard = 0; guard < 400; guard += 1) {
    const i1 = s.indexOf(stackOpen, searchFrom);
    if (i1 === -1) break;
    if (i1 >= 4 && s.slice(i1 - 4, i1) === "]\n]\n") {
      searchFrom = i1 + stackOpen.length;
      continue;
    }
    let i0 = s.lastIndexOf(prefix, i1 - 1);
    while (i0 !== -1) {
      const inner = s.slice(i0 + prefix.length, i1);
      if (!innerInvalid(inner)) break;
      i0 = s.lastIndexOf(prefix, i0 - 1);
    }
    if (i0 === -1) {
      searchFrom = i1 + stackOpen.length;
      continue;
    }
    let inner = s.slice(i0 + prefix.length, i1);
    inner = inner.replace(/\n\]\n\]\s*$/s, "");
    const nestedClose =
      i0 >= 4 && s.slice(i0 - 4, i0) === "]\n]\n";
    const stackCloseOut = nestedClose ? stackCloseNested : stackCloseExpanded;
    const gridOpen = `#block[
#grid(
  columns: (1.1fr, 0.9fr),
  column-gutter: 14pt,
)[
  [
${inner}
  ]
  [
  #stack(spacing: 0.55em)[`;
    s = s.slice(0, i0) + gridOpen + s.slice(i1 + stackOpen.length);
    const insertEnd = i0 + gridOpen.length;
    const stackListOpenIdx = insertEnd - 1;
    const stackContentEnd = endOfBracketContent(s, stackListOpenIdx);
    if (stackContentEnd < 0 || s[stackListOpenIdx] !== "[") {
      searchFrom = i0 + gridOpen.length;
      continue;
    }
    const stackInner = s.slice(stackListOpenIdx + 1, stackContentEnd - 1);
    const rel = stackInner.lastIndexOf(stackCloseTail);
    if (rel === -1) {
      searchFrom = i0 + gridOpen.length;
      continue;
    }
    const j = stackListOpenIdx + 1 + rel;
    if (!alreadyExpandedClose(j)) {
      s = s.slice(0, j) + stackCloseOut + s.slice(j + stackCloseLen);
    }
    searchFrom = i0 + gridOpen.length;
  }
  s = rewriteResidualRawSpeakerRows(s);
  fs.writeFileSync(bodyTypPath, s, "utf8");
}

function blockInnerOrNull(block: string): string | null {
  const t = block.trimStart();
  if (!t.startsWith("#block[")) return null;
  const offset = block.length - t.length;
  const i = offset + t.indexOf("#block[");
  const open = i + "#block[".length - 1;
  const end = endOfBracketContent(block, open);
  if (end < 0) return null;
  return block.slice(open + 1, end - 1);
}

function splitRawSpeakerRowInner(
  inner: string
): { avatarWrap: string; speechWrap: string } | null {
  const trimmed = inner.replace(/^\s+/, "");
  if (!trimmed.startsWith("#block[")) return null;
  const off = inner.length - trimmed.length;
  const firstRel = off + trimmed.indexOf("#block[");
  const firstOpen = firstRel + "#block[".length - 1;
  const firstEnd = endOfBracketContent(inner, firstOpen);
  if (firstEnd < 0) return null;
  const avatarWrap = inner.slice(firstRel, firstEnd);
  let pos = firstEnd;
  while (pos < inner.length && /\s/.test(inner[pos]!)) pos += 1;
  if (!inner.startsWith("#block[", pos)) return null;
  const secondOpen = pos + "#block[".length - 1;
  const secondEnd = endOfBracketContent(inner, secondOpen);
  if (secondEnd < 0) return null;
  const speechWrap = inner.slice(pos, secondEnd);
  if (inner.slice(secondEnd).trim().length > 0) return null;
  const avatarInner = blockInnerOrNull(avatarWrap);
  if (!avatarInner || !typstSnippetContainsSpeakerAvatarImagePath(avatarInner)) {
    return null;
  }
  const speechInner = blockInnerOrNull(speechWrap);
  if (!speechInner) return null;
  if (/^\s*#figure\(/s.test(speechInner)) return null;
  return { avatarWrap, speechWrap };
}

function rewriteRawSpeakerBlock(block: string): string {
  const t = block.trim();
  if (!t.startsWith("#block[")) return block;
  const open = t.indexOf("#block[") + "#block[".length - 1;
  const end = endOfBracketContent(t, open);
  if (end < 0) return block;
  const inner = t.slice(open + 1, end - 1);
  const parts = splitRawSpeakerRowInner(inner);
  if (!parts) return block;
  const avatarInner = blockInnerOrNull(parts.avatarWrap);
  const speechInner = blockInnerOrNull(parts.speechWrap);
  if (!avatarInner || !speechInner) return block;
  const figCount = (avatarInner.match(/#figure\(/g) ?? []).length;
  const multiface = figCount > 1;
  const leftColRaw = multiface
    ? `#stack(spacing: 0.5em)[\n${avatarInner.trim()}\n]`
    : avatarInner.trim();
  const bubbleIdx = speakerBubblePaletteIndexFromTypstAvatarInner(avatarInner);
  return typstSpeakerRowRewrittenBlock({
    multiface,
    leftColRaw,
    bubbleIdx,
    speechInner,
  });
}

function rewriteResidualRawSpeakerRows(body: string): string {
  let out = body;
  let search = 0;
  for (let guard = 0; guard < 20000; guard += 1) {
    const b = out.indexOf("#block[", search);
    if (b < 0) break;
    const open = b + "#block[".length - 1;
    const end = endOfBracketContent(out, open);
    if (end < 0) break;
    const block = out.slice(b, end);
    if (!typstSnippetContainsSpeakerAvatarImagePath(block)) {
      search = b + 1;
      continue;
    }
    const rewritten = rewriteRawSpeakerBlock(block);
    if (rewritten === block) {
      search = b + 1;
      continue;
    }
    out = out.slice(0, b) + rewritten + out.slice(end);
    search = b + rewritten.length;
  }
  return out;
}

/**
 * Pandoc html→typst turns `<dl><dt>term</dt><dd>gloss</dd></dl>` into `term: #block[gloss]`, which
 * loses site styling from `styles/index.css` (`dt` bold, `dt::after` " ≈ ", `dd` italic,
 * `dd > em` curly quotes). Recreate that inline in Typst so the PDF matches the article.
 */
function patchTypstDefinitionListGlosses(s: string): string {
  const lineRe = /^([ \t]*)(\S+(?:[ \t]+\S+)*):[ \t]*#block\[/gm;
  type Hit = { start: number; end: number; indent: string; term: string; openBracket: number };
  const hits: Hit[] = [];
  let m: RegExpExecArray | null;
  while ((m = lineRe.exec(s)) !== null) {
    const term = m[2] ?? "";
    if (/[\[\]]/.test(term)) continue;
    // Skip list-like / explanatory headings (e.g. `- / .i ku'i: #block[…]`), not Lojban gloss keys.
    if (!/^[\p{L}\p{N}]/u.test(term)) continue;
    if (/\s\/\s/.test(term)) continue;
    const openBracket = m.index + m[0].length - 1;
    if (s[openBracket] !== "[") continue;
    const closeBracket = endOfBracketContent(s, openBracket);
    if (closeBracket < 0) continue;
    const inner = s.slice(openBracket + 1, closeBracket - 1);
    const innerTrimmed = inner.replace(/^\s+/, "").replace(/\s+$/, "");
    if (innerTrimmed.length === 0) continue;
    if (innerTrimmed.length > 800) continue;
    if (/^\s*#(block|quote)\b/m.test(innerTrimmed)) continue;

    hits.push({
      start: m.index,
      end: closeBracket,
      indent: m[1] ?? "",
      term,
      openBracket,
    });
  }
  hits.sort((a, b) => b.start - a.start);
  for (const { start, end, indent, term, openBracket } of hits) {
    const closeAfter = end;
    const inner = s.slice(openBracket + 1, closeAfter - 1);
    const innerTrimmed = inner.replace(/^\s+/, "").replace(/\s+$/, "");
    const replacement = `${indent}#strong[${term}]#text(" ≈ ")#text("‘")#emph[${innerTrimmed}]#text("’")`;
    s = s.slice(0, start) + replacement + s.slice(closeAfter);
  }
  return s;
}

/**
 * Pandoc emits `#horizontalrule`; included `body.typ` does not inherit `main.typ` imports
 * (speaker bubble: `#import "speaker-bubble.typ": speaker_speech_bubble` is prepended to `body.typ`).
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
  // Strip Pandoc table-local cell alignment callbacks (2-col, 3-col, ... `auto` tuples).
  // Keep template-level table alignment as single source of truth.
  s = s.replace(
    /\n\s*align:\s*\(col,\s*row\)\s*=>\s*\((?:\s*auto\s*,)+\s*\)\.at\(col\),\s*/g,
    "\n"
  );
  s = s.replace(
    /\n\s*align:\s*\(col,\s*row\)\s*=>\s*\(auto,auto,\)\.at\(col\),\s*/g,
    "\n"
  );
  // Pandoc wraps tables as `#figure(align(center)[#table(...)])`; center wrapper creates the
  // visible left/right gutter around dialogue tables in PDF. Unwrap to plain `#table(...)`.
  s = s.replace(/align\(center\)\s*\[#table\(/g, "table(");
  // Close bracket from `align(center)[ ... ]` becomes redundant after unwrapping.
  s = s.replace(/\n\)\s*\]\s*\n\)/g, "\n)\n)");
  // Pandoc html→typst: `<img width="663">` becomes `#box(width: 663, …)`; Typst needs a unit.
  s = s.replace(/#box\(width: (\d+),/g, "#box(width: $1pt,");
  // Article book print: two-column tables 50%/50% (`index.css` .book-print-content … :has(…2…last))
  s = s.replace(/columns:\s*2(\s*,)/g, "columns: (1fr, 1fr)$1");
  // Dialogue tables (sprite + Lojban + English): keep avatar narrow, stretch text columns.
  s = s.replace(/columns:\s*3(\s*,)/g, "columns: (auto, 1fr, 1fr)$1");
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
  // Pandoc html→typst: `#strong[la]` / `#strong[lo]` — inner `[la]` is parsed as a link, not text.
  s = s.replace(
    /#strong\[(la|le|li|lo|lu)\]/g,
    '#strong[#"$1"]'
  );
  // Pandoc definition-list gloss lines: `/ term: #block[` (term may contain spaces, e.g. `le prenu`).
  // Strip the leading slash so output is uniform and Typst does not treat `/` as division; do not use
  // `#text("/ ")` here (single-word terms were exempt from that escape and stayed as `/ …`, which
  // still showed a slash in the PDF).
  // Term is always on one line (horizontal spaces only between words; never `\n` in `\s`).
  const glossDefHead = String.raw`(\S+(?:[ \t]+\S+)*:[ \t]*#block\[)`;
  // Use horizontal whitespace only after `/` — `\s` includes `\n`, which would let one match span
  // from `/` on a line to a distant `…: #block[` and corrupt almost the whole `body.typ` (friendly-cll).
  const slashSep = "[ \\t]+";
  s = s.replace(
    new RegExp(`^([ \\t]*)#text\\("/ "\\)${slashSep}${glossDefHead}`, "gm"),
    "$1$2"
  );
  s = s.replace(new RegExp(`^([ \\t]*)/${slashSep}${glossDefHead}`, "gm"), "$1$2");
  // Continued "a / b / c" typography: a line starting with `/ #strong` / `/ #emph` is division in Typst.
  s = s.replace(new RegExp(`^/${slashSep}#strong`, "gm"), '#text("/ ") #strong');
  s = s.replace(new RegExp(`^/${slashSep}#emph`, "gm"), '#text("/ ") #emph');
  s = s.replace(/^\/[ \t]*$/gm, '#text("/")');
  // Do **not** match Pandoc’s definition lists: `/ term: #block[…]` (any number of head words).
  s = s.replace(
    new RegExp(
      String.raw`^/${slashSep}(?!\S+(?:[ \t]+\S+)*:[ \t]*#block\[)(?=[^\s#])`,
      "gm"
    ),
    '#text("/ ") '
  );
  // Pandoc html→typst + Kramdown `{#id}` on headings can emit `<slug-slug>` while `#link(<slug>)`
  // still targets the short id — collapse any duplicated ASCII slug segment.
  s = s.replace(/<([a-z0-9][a-z0-9-]*)-\1>/gi, "<$1>");
  // Same pipeline may leave a literal `{\#id}` suffix on `===` / `==` heading lines; strip it.
  s = s.replace(/^(={1,6}\s[^\n]+?)\s*\{\\#[^}\n]+\}/gm, "$1");
  // Pandoc table cells that are only `/` or `|` — Typst treats `[/` / `[|` as invalid markup in content.
  s = s.replace(/\[\/\s*\n/g, '[#text("/")\n');
  s = s.replace(/\[\|\s*\n/g, '[#text("|")\n');
  s = patchTypstDefinitionListGlosses(s);
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
  const { bookMdPath } = options;
  /** Typst `cwd` is `workDir`; output must be absolute or writes resolve under `tmp/typst-book/…`. */
  const outPdfPath = path.resolve(options.outPdfPath);
  const pandoc = options.pandoc ?? "pandoc";
  const typst = options.typst ?? "typst";

  const publicAssetsDir = resolvePublicAssetsDir(projectRoot);

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
  let html: string;
  if (options.htmlAfterMermaid !== undefined) {
    html = options.htmlAfterMermaid;
    logPhase("markdown + mermaid (skipped; using batch-raster HTML)");
  } else {
    const { text: htmlFragment } = await markdownToHtml({
      content,
      fullPath: bookMdPath,
      bookPdfMermaid: true,
      verboseBookBuild: true,
    });
    logPhase("markdownToHtml (total; see [typst-book md] lines above)");

    html = stripPrintHidden(htmlFragment);
    html = normalizeFontColorTags(html);
    html = blockquoteEmSpanBlockLines(html);
    logPhase(
      "stripPrintHidden + normalizeFontColorTags + blockquoteEmSpanBlockLines"
    );

    html = await extractMermaidSvgDivsToImages(html, workDir, projectRoot, true);
    logPhase("mermaid rasterize (total; see [typst-book mermaid] lines above)");
  }

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
  const speakerBubbleSrc = path.join(
    __dirname,
    "learn-lojban",
    "speaker-bubble.typ"
  );

  if (!fs.existsSync(templateSrc)) {
    throw new Error(`Missing template: ${templateSrc}`);
  }
  if (!fs.existsSync(brandSrc)) {
    throw new Error(`Missing brandbooks: ${brandSrc}`);
  }
  if (!fs.existsSync(speakerBubbleSrc)) {
    throw new Error(`Missing speaker bubble module: ${speakerBubbleSrc}`);
  }
  fs.copyFileSync(templateSrc, path.join(workDir, "template.typ"));
  fs.copyFileSync(brandSrc, path.join(workDir, "brandbooks.typ"));
  fs.copyFileSync(speakerBubbleSrc, path.join(workDir, "speaker-bubble.typ"));

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

  patchBookSpeakerTypstBody(bodyTypPath);

  // `#include "body.typ"` does not inherit `main.typ` imports — normalize speaker helpers import.
  {
    let bodyTyp = fs.readFileSync(bodyTypPath, "utf8");
    bodyTyp = bodyTyp.replace(/^#import "speaker-bubble.typ":[^\n]*\n+/m, "");
    fs.writeFileSync(
      bodyTypPath,
      `#import "speaker-bubble.typ": speaker_speech_bubble, speaker_row_avatar_column\n\n` +
        bodyTyp,
      "utf8"
    );
  }

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
  const argv = process.argv.slice(2);
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getVrejiPath, getMdPagesPath } = require("../paths");
  const defaultBook = path.join(
    getMdPagesPath(),
    "en",
    "books",
    "learn-lojban.md"
  );
  const bookMd = argv[0] ? path.resolve(argv[0]) : defaultBook;
  const vreji = getVrejiPath();
  const outPdf = path.resolve(
    argv[1] ?? path.join(vreji, "uencu", "en", "learn-lojban-pre.pdf")
  );

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
