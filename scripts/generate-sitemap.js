#!/usr/bin/env node
/**
 * Writes out/sitemap.xml by scanning the exported `out/` tree for every
 * `index.html` file Next.js emitted.
 *
 * Why scan the build output and not `data/pages/*.md`?
 *   Several routes generate pages dynamically via `getStaticPaths` and have
 *   no corresponding markdown file:
 *     - `/<lang>/texts/<korporaSlug>/` — one per TSV in
 *       `data/assets/korpora-tsv/` × every locale short code
 *       (see pages/[lang]/texts/[korporaSlug].tsx).
 *     - `/<lang>/welcome/`, `/<lang>/list/`, `/<lang>/texts/` indices —
 *       backed by per-locale `getStaticPaths` output, not always 1:1 with
 *       `data/pages/<lang>/` files when a locale ships via fallbacks.
 *   Scanning `out/` captures exactly what was shipped, so the sitemap and
 *   the deployed site can't drift.
 *
 * Must run AFTER `next build` (see `package.json` → "build").
 */
const fs = require("fs");
const path = require("path");
const { paths } = require("../lib/paths");

const SITE_URL = "https://lojban.pw";

// Top-level out/ entries that aren't user-facing HTML pages.
const SKIP_TOP_LEVEL = new Set([
  "_next",
  "_error",
  "assets",
  "uencu",
  ".cache",
  "api",
]);

// File basenames to ignore when walking.
const SKIP_FILES = new Set(["404.html", "500.html", "sitemap.xml", "robots.txt"]);

function shouldSkipDir(relDir) {
  const top = relDir.split(path.sep)[0];
  if (!top) return false;
  if (top.startsWith(".")) return true;
  if (SKIP_TOP_LEVEL.has(top)) return true;
  return false;
}

function collectIndexHtml(root, relDir = "") {
  const full = path.join(root, relDir);
  if (!fs.existsSync(full)) return [];
  const dirents = fs.readdirSync(full, { withFileTypes: true });
  let out = [];
  for (const d of dirents) {
    const rel = relDir ? path.join(relDir, d.name) : d.name;
    if (d.isDirectory()) {
      if (shouldSkipDir(rel)) continue;
      out = out.concat(collectIndexHtml(root, rel));
    } else if (d.isFile()) {
      if (SKIP_FILES.has(d.name)) continue;
      if (d.name === "index.html") {
        out.push(rel.replace(/\\/g, "/"));
      }
    }
  }
  return out;
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pathFromIndexHtml(rel) {
  // `index.html` → `/`, `en/texts/foo/index.html` → `/en/texts/foo/`.
  const dir = rel.replace(/(^|\/)index\.html$/, "");
  if (!dir) return "/";
  return `/${dir}/`;
}

function main() {
  const outDir = path.join(paths.cwd, "out");
  if (!fs.existsSync(outDir)) {
    console.warn("generate-sitemap: out/ missing, skip write");
    process.exit(0);
  }

  const indexFiles = collectIndexHtml(outDir);
  const urls = indexFiles.map((f) => `${SITE_URL}${pathFromIndexHtml(f)}`);
  const sorted = [...new Set(urls)].sort();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sorted.map((loc) => `  <url><loc>${escapeXml(loc)}</loc></url>`).join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(outDir, "sitemap.xml"), xml, "utf8");
  console.log(
    `generate-sitemap: wrote ${sorted.length} URLs to ${path.join(outDir, "sitemap.xml")}`
  );
}

main();
