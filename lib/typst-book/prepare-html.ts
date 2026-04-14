import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import sharp from "sharp";
import playwright, { type Browser, type Page } from "playwright-core";
import htmlParser from "node-html-parser";

import { mermaidBookScreenshotStyle } from "./mermaid-book-pdf";

/** A4 body width minus horizontal margins — keep in sync with `learn-lojban/template.typ` `page-margin-x` (11mm). */
const BOOK_BODY_INNER_WIDTH_MM = 210 - 2 * 11;

/** Max layout width for Mermaid (CSS px, 96dpi), so diagrams never exceed the Typst text block. */
function maxMermaidDiagramWidthPx(): number {
  return (BOOK_BODY_INNER_WIDTH_MM / 25.4) * 96;
}

/**
 * Mermaid SVGs usually ship with `width="100%"` so they stretch to the viewport. In a wide
 * Playwright page that rescales every chart differently (viewBox width vs 1400px), so text
 * rasterizes at inconsistent sizes. Force 1:1 mapping from viewBox units to CSS px before
 * screenshot, then cap width to `maxWidthPx` (body column) so PDF width never exceeds 100%.
 * Returns logical size for `<img width height>` hints.
 */
async function sizeMermaidSvgToViewBoxPx(
  page: Page,
  maxWidthPx: number
): Promise<{ w: number; h: number } | null> {
  return page.evaluate((maxW) => {
    const svg = document.querySelector("div.mermaid svg");
    if (!svg || !(svg instanceof SVGSVGElement)) return null;
    const raw = svg.getAttribute("viewBox");
    if (!raw) return null;
    const parts = raw
      .trim()
      .split(/[\s,]+/)
      .map((x) => Number.parseFloat(x));
    if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return null;
    const vbW = parts[2]!;
    const vbH = parts[3]!;
    if (vbW <= 0 || vbH <= 0) return null;

    let w = vbW;
    let h = vbH;
    if (w > maxW) {
      const s = maxW / w;
      w = maxW;
      h = h * s;
    }

    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.style.setProperty("width", `${w}px`, "important");
    svg.style.setProperty("height", `${h}px`, "important");
    svg.style.setProperty("max-width", `${maxW}px`, "important");
    svg.style.setProperty("max-height", "none", "important");

    return { w, h };
  }, maxWidthPx);
}

/**
 * Remove nodes that are web-only in print (Tailwind `print:hidden` and nested content).
 */
/**
 * Pandoc drops `<font color>`; convert to `<span style="color:…">` so the AST keeps color (see typst-colors.lua).
 */
/**
 * Direct-child <em> and <span> inside blockquote <p> are forced onto separate lines for Typst PDF.
 * Pandoc’s HTML reader ignores CSS `display:block` on inline tags; a wrapping <div> becomes `#block[…]`
 * inside `#quote` (same UX as treating gloss / colored spans as block-level in print).
 */
export function blockquoteEmSpanBlockLines(html: string): string {
  const dom = new JSDOM(`<!DOCTYPE html><html><body>${html}</body></html>`);
  const doc = dom.window.document.body;

  for (const bq of doc.querySelectorAll("blockquote")) {
    for (const p of bq.querySelectorAll("p")) {
      if (p.closest("blockquote") !== bq) continue;
      splitBlockquoteParagraphForTypst(p as HTMLParagraphElement);
    }
  }

  return doc.innerHTML;
}

function splitBlockquoteParagraphForTypst(p: HTMLParagraphElement) {
  const parent = p.parentElement;
  if (!parent) return;

  const isSplitTarget = (n: Node): n is Element =>
    n.nodeType === 1 && (n.nodeName === "EM" || n.nodeName === "SPAN");

  const children = Array.from(p.childNodes);
  if (!children.some(isSplitTarget)) return;

  const doc = p.ownerDocument!;
  const insertPoint = p.nextSibling;
  parent.removeChild(p);

  const inlineBuffer: Node[] = [];

  const flushParagraph = () => {
    if (inlineBuffer.length === 0) return;
    const onlyWs = inlineBuffer.every(
      (n) =>
        n.nodeType === 3 &&
        (n as Text).data.replace(/\s+/g, "") === ""
    );
    if (onlyWs) {
      inlineBuffer.length = 0;
      return;
    }
    const np = doc.createElement("p");
    for (const n of inlineBuffer) {
      np.appendChild(n);
    }
    inlineBuffer.length = 0;
    parent.insertBefore(np, insertPoint);
  };

  for (const node of children) {
    if (isSplitTarget(node)) {
      flushParagraph();
      const div = doc.createElement("div");
      div.className = "book-print-bq-block";
      div.appendChild(node);
      parent.insertBefore(div, insertPoint);
    } else {
      inlineBuffer.push(node);
    }
  }
  flushParagraph();
}

export function normalizeFontColorTags(html: string): string {
  const dom = new JSDOM(`<!DOCTYPE html><html><body>${html}</body></html>`);
  const doc = dom.window.document.body;
  for (const font of doc.querySelectorAll("font[color]")) {
    if (!font.parentNode) continue;
    const c = font.getAttribute("color")?.trim() ?? "";
    const hex = c.startsWith("#") ? c : `#${c}`;
    const span = dom.window.document.createElement("span");
    span.setAttribute("style", `color:${hex}`);
    span.innerHTML = font.innerHTML;
    font.parentNode.replaceChild(span, font);
  }
  return doc.innerHTML;
}

/**
 * Replace `.audio-inline` / `.guibutton` wrappers (web audio UI) with plain HTML that Pandoc→Typst
 * renders as bold; any `color:` from inline styles is preserved via `typst-colors.lua` on `<span style="…">`.
 */
export function flattenGuibuttonForBookPdf(html: string): string {
  const dom = new JSDOM(`<!DOCTYPE html><html><body>${html}</body></html>`);
  const doc = dom.window.document.body;

  const colorFromStyle = (style: string): string | null => {
    const m = style.match(/color:\s*([^;]+)/i);
    return m ? m[1]!.trim() : null;
  };

  /** First `color:` on this node or nested colored spans / `<font color>`. */
  const inheritedTextColor = (el: Element): string | null => {
    const own = colorFromStyle(el.getAttribute("style") ?? "");
    if (own) return own;
    for (const node of el.querySelectorAll("span[style]")) {
      const c = colorFromStyle(node.getAttribute("style") ?? "");
      if (c) return c;
    }
    const font = el.querySelector("font[color]");
    if (font) {
      const raw = font.getAttribute("color")?.trim() ?? "";
      if (raw) return raw.startsWith("#") ? raw : `#${raw}`;
    }
    return null;
  };

  const replaceWithStrongOrColoredSpan = (el: Element) => {
    const text = el.textContent?.trim() ?? "";
    if (!text) return;
    const color = inheritedTextColor(el);
    if (color) {
      const span = dom.window.document.createElement("span");
      span.setAttribute("style", `color:${color};font-weight:700`);
      span.textContent = text;
      el.replaceWith(span);
    } else {
      const strong = dom.window.document.createElement("strong");
      strong.textContent = text;
      el.replaceWith(strong);
    }
  };

  for (const el of [
    ...doc.querySelectorAll("span.audio-inline"),
    ...doc.querySelectorAll("b.audio-inline"),
  ]) {
    replaceWithStrongOrColoredSpan(el);
  }

  for (const el of [...doc.querySelectorAll("b.guibutton, strong.guibutton")]) {
    if (el.closest("span.audio-inline") || el.classList.contains("audio-inline")) continue;
    replaceWithStrongOrColoredSpan(el);
  }

  return doc.innerHTML;
}

export function stripPrintHidden(html: string): string {
  const root = htmlParser.parse(html);
  let el: import("node-html-parser").HTMLElement | null;
  while ((el = root.querySelector('[class*="print:hidden"]'))) {
    el.remove();
  }
  return root.toString();
}

/**
 * Pandoc turns data-URI images into `#image("data:image/svg+xml;base64,...")` which exceeds
 * filesystem limits. Write decoded blobs under `workDir/extracted-media/` and swap `src` to
 * project-root paths (`/…`) for `rewriteAssetUrlsForTypstProjectRoot`.
 */
export function extractDataUriImagesToFiles(
  html: string,
  workDir: string,
  projectRoot: string
): string {
  const root = htmlParser.parse(html);
  const outDir = path.join(workDir, "extracted-media");
  fs.mkdirSync(outDir, { recursive: true });

  let i = 0;
  for (const img of root.querySelectorAll("img")) {
    const src = img.getAttribute("src");
    if (!src || !src.startsWith("data:image")) continue;

    const compact = src.replace(/\s+/g, "");
    const comma = compact.indexOf(",");
    if (comma === -1) continue;
    const header = compact.slice(0, comma).toLowerCase();
    const b64 = compact.slice(comma + 1);
    if (!header.includes("base64")) continue;

    let ext = "bin";
    if (header.includes("svg+xml")) ext = "svg";
    else if (header.includes("png")) ext = "png";
    else if (header.includes("webp")) ext = "webp";
    else if (header.includes("jpeg") || header.includes("jpg")) ext = "jpg";

    let buf: string | Buffer = Buffer.from(b64, "base64");
    if (ext === "svg") {
      let t = buf.toString("utf8");
      t = t.replace(/&nbsp;/g, " ");
      buf = t;
    }
    const fname = `embed-${i++}.${ext}`;
    const abs = path.join(outDir, fname);
    fs.writeFileSync(abs, buf);

    const relToRoot = path
      .relative(projectRoot, abs)
      .split(path.sep)
      .join("/");
    img.setAttribute(
      "src",
      relToRoot.startsWith("/") ? relToRoot : `/${relToRoot}`
    );
  }

  return root.toString();
}

const chromiumLaunchOptions = {
  headless: true as const,
  ...(process.env.PLAYWRIGHT_BROWSERS_PATH
    ? {}
    : {
        executablePath:
          process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ??
          "/usr/bin/google-chrome",
      }),
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
};

/** Single shared browser for all book PDF Mermaid passes (`print-all-books` batch). */
export async function launchBookPdfMermaidBrowser(): Promise<Browser> {
  return playwright.chromium.launch(chromiumLaunchOptions);
}

/**
 * Mermaid SVG uses `foreignObject` text; Sharp/librsvg drops labels. Rasterize with Chromium
 * (same idea as remark-mermaid SSR) so labels appear in the PDF.
 *
 * @param sharedBrowser When set, this browser is reused (not closed); use for batch rasterization
 *   after `launchBookPdfMermaidBrowser()`.
 */
export async function extractMermaidSvgDivsToImages(
  html: string,
  workDir: string,
  projectRoot: string,
  /** Log diagram-by-diagram progress (book PDF builds). */
  verbose = false,
  sharedBrowser?: Browser
): Promise<string> {
  const mLog = (msg: string) => {
    if (verbose) console.log(`[typst-book mermaid] ${msg}`);
  };
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const dom = new JSDOM(`<!DOCTYPE html><html><body>${html}</body></html>`);
  const doc = dom.window.document.body;
  const outDir = path.join(workDir, "extracted-media");
  fs.mkdirSync(outDir, { recursive: true });

  const divs = [...doc.querySelectorAll("div.mermaid")].filter(
    (d) => d.querySelector("svg") && d.parentNode
  );
  if (divs.length === 0) {
    mLog("no div.mermaid with SVG — skip Chromium");
    return doc.innerHTML;
  }

  const ownBrowser = sharedBrowser == null;
  const browser = sharedBrowser ?? (await launchBookPdfMermaidBrowser());
  if (ownBrowser) {
    mLog(`rasterize ${divs.length} diagram(s) with Playwright Chromium`);
    mLog(`Chromium launched`);
  } else {
    mLog(`rasterize ${divs.length} diagram(s) with shared Playwright Chromium`);
  }

  try {
    const tCtx = Date.now();
    const context = await browser.newContext({
      viewport: { width: 1400, height: 4000 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    mLog(`browser context + page ready in ${Date.now() - tCtx}ms`);

    let i = 0;
    for (let di = 0; di < divs.length; di++) {
      const div = divs[di]!;
      const svg = div.querySelector("svg");
      if (!svg || !div.parentNode) continue;

      const diagramIndex = i + 1;
      const tDiag = Date.now();
      mLog(`diagram ${diagramIndex}/${divs.length}: setContent + screenshot …`);

      const snippet = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<style>html,body{margin:0;padding:0;background:white}</style>
<style>${mermaidBookScreenshotStyle}</style></head>
<body>${div.outerHTML}</body></html>`;

      await page.setContent(snippet, { waitUntil: "load", timeout: 120000 });
      await page.evaluate(async () => {
        await document.fonts?.ready?.catch(() => {});
        await new Promise((r) => setTimeout(r, 200));
      });

      const logicalSize = await sizeMermaidSvgToViewBoxPx(
        page,
        maxMermaidDiagramWidthPx()
      );
      await page.evaluate(async () => {
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      });

      const pngPath = path.join(outDir, `mermaid-${i++}.png`);
      const handle = page.locator("div.mermaid svg").first();
      let screenshotOk = false;
      let lastError: unknown = null;
      for (let attempt = 1; attempt <= 3 && !screenshotOk; attempt += 1) {
        try {
          // Element screenshots can time out while waiting for "stable"; short retries smooth over
          // occasional layout/paint jitter without failing the whole book build.
          await handle.screenshot({
            path: pngPath,
            type: "png",
            timeout: 15000,
            animations: "disabled",
          });
          screenshotOk = true;
        } catch (e) {
          lastError = e;
          mLog(
            `diagram ${diagramIndex}/${divs.length}: element screenshot retry ${attempt}/3`
          );
          if (attempt < 3) await sleep(250 * attempt);
        }
      }
      if (!screenshotOk) {
        try {
          const clip = await page.evaluate(() => {
            const svg = document.querySelector("div.mermaid svg");
            if (!svg) return null;
            const r = svg.getBoundingClientRect();
            if (!(r.width > 0) || !(r.height > 0)) return null;
            return {
              x: Math.max(0, r.x),
              y: Math.max(0, r.y),
              width: Math.max(1, r.width),
              height: Math.max(1, r.height),
            };
          });
          if (!clip) throw new Error("Cannot compute SVG clip rectangle");
          mLog(`diagram ${diagramIndex}/${divs.length}: fallback page clip screenshot`);
          await page.screenshot({
            path: pngPath,
            type: "png",
            clip,
            animations: "disabled",
            timeout: 15000,
          });
          screenshotOk = true;
        } catch (fallbackErr) {
          lastError = fallbackErr;
        }
      }
      if (!screenshotOk) {
        console.warn(
          `[typst-book mermaid] diagram ${diagramIndex}/${divs.length}: screenshot failed, replacing with text placeholder`
        );
        if (lastError) console.warn(lastError);
        const fallback = dom.window.document.createElement("p");
        fallback.textContent = "[Diagram unavailable in PDF build]";
        div.parentNode.replaceChild(fallback, div);
        continue;
      }

      const relToRoot = path
        .relative(projectRoot, pngPath)
        .split(path.sep)
        .join("/");
      const src = relToRoot.startsWith("/") ? relToRoot : `/${relToRoot}`;

      const img = dom.window.document.createElement("img");
      img.setAttribute("src", src);
      img.setAttribute("alt", "diagram");
      // Width/height are layout px for Chromium; Pandoc→Typst copies the number as `…pt`
      // (see `patchBodyTypFile` in build-learn-lojban.ts, which fixes mermaid px→pt + cap).
      if (logicalSize != null) {
        img.setAttribute("width", String(Math.round(logicalSize.w)));
        img.setAttribute("height", String(Math.round(logicalSize.h)));
      }
      div.parentNode.replaceChild(img, div);
      mLog(
        `diagram ${diagramIndex}/${divs.length}: done in ${Date.now() - tDiag}ms → ${path.basename(pngPath)}`
      );
    }
    await context.close();
    mLog("browser context closed");
  } finally {
    if (ownBrowser) {
      await browser.close();
      mLog("Chromium closed");
    }
  }

  return doc.innerHTML;
}

/** Resolve `/data/assets/…` under repo root or Docker `public/assets/…`. */
function absoluteFromProjectRoot(projectRoot: string, webPath: string): string {
  const rel = webPath.startsWith("/") ? webPath.slice(1) : webPath;
  const primary = path.join(projectRoot, rel);
  if (fs.existsSync(primary)) return primary;
  if (rel.startsWith("data/assets/")) {
    const alt = path.join(
      projectRoot,
      "src",
      "public",
      "assets",
      rel.slice("data/assets/".length)
    );
    if (fs.existsSync(alt)) return alt;
  }
  return primary;
}

/** Replace missing `/data/...` or `/assets/...` image URLs so Typst does not fail on stale links. */
export function replaceMissingImageSrcs(html: string, projectRoot: string): string {
  const placeholder = "/data/assets/pixra/cilre/sruri_since.webp";
  const root = htmlParser.parse(html);
  for (const img of root.querySelectorAll("img")) {
    const src = img.getAttribute("src");
    if (!src?.startsWith("/")) continue;
    const abs = absoluteFromProjectRoot(projectRoot, src);
    if (!fs.existsSync(abs)) {
      console.warn(`Missing image (placeholder): ${src}`);
      img.setAttribute("src", placeholder);
    }
  }
  return root.toString();
}

/**
 * Rewrite `/assets/...` URLs to paths relative to the repository root.
 * Use with `typst compile --root <repoRoot>` so reads stay within the project.
 */
export function rewriteAssetUrlsForTypstProjectRoot(
  html: string,
  projectRoot: string,
  publicAssetsDir: string
): string {
  const root = htmlParser.parse(html);
  const absAssets = path.resolve(publicAssetsDir);

  const rewrite = (url: string | undefined): string | undefined => {
    if (!url || !url.startsWith("/assets/")) return url;
    const assetRel = url.replace(/^\/assets\//, "");
    const absFile = path.join(absAssets, assetRel);
    const relToRoot = path
      .relative(projectRoot, absFile)
      .split(path.sep)
      .join("/");
    // Leading `/` = path from `--root` (see typst `image()` / project root)
    return relToRoot.startsWith("/") ? relToRoot : `/${relToRoot}`;
  };

  for (const img of root.querySelectorAll("img")) {
    const src = img.getAttribute("src");
    const next = rewrite(src ?? undefined);
    if (next) img.setAttribute("src", next);
  }

  for (const el of root.querySelectorAll("[data-url]")) {
    const u = el.getAttribute("data-url");
    const next = rewrite(u ?? undefined);
    if (next) el.setAttribute("data-url", next);
  }

  // SVG <image href="..."> if any
  for (const el of root.querySelectorAll("image")) {
    const href = el.getAttribute("href") ?? el.getAttribute("xlink:href");
    const next = rewrite(href ?? undefined);
    if (next) {
      el.setAttribute("href", next);
    }
  }

  return root.toString();
}
