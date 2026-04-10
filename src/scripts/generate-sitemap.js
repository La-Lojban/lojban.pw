#!/usr/bin/env node
/**
 * Writes out/sitemap.xml after `next build` by scanning markdown pages.
 * Must stay aligned with site_url in config (https://lojban.pw).
 */
const fs = require("fs");
const path = require("path");
const { paths } = require("../lib/paths");

const SITE_URL = "https://lojban.pw";

function shouldSkipDir(name) {
  return name.startsWith(".");
}

function getMdFiles(dir, subfolder = "") {
  const full = path.join(dir, subfolder);
  if (!fs.existsSync(full)) return [];
  const dirents = fs.readdirSync(full, { withFileTypes: true });
  let files = [];
  for (const d of dirents) {
    if (shouldSkipDir(d.name)) continue;
    const res = path.join(subfolder, d.name);
    if (d.isDirectory()) {
      files = files.concat(getMdFiles(dir, res));
    } else if (d.name.endsWith(".md")) {
      files.push(res.replace(/\\/g, "/"));
    }
  }
  return files;
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function main() {
  const mdRoot = paths.mdPages;
  // Next.js `output: "export"` writes beside `next.config.js` → `src/out` (same as `paths.cwd`).
  const outDir = path.join(paths.cwd, "out");
  const files = getMdFiles(mdRoot);
  const urls = files.map((f) => {
    const rel = f.replace(/\.md$/i, "").replace(/\\/g, "/");
    const pathPart = rel.split("/").filter(Boolean).join("/");
    return `${SITE_URL}/${pathPart}/`;
  });

  const sorted = [...new Set(urls)].sort();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sorted.map((loc) => `  <url><loc>${escapeXml(loc)}</loc></url>`).join("\n")}
</urlset>
`;

  if (!fs.existsSync(outDir)) {
    console.warn("generate-sitemap: out/ missing, skip write");
    process.exit(0);
  }
  fs.writeFileSync(path.join(outDir, "sitemap.xml"), xml, "utf8");
  console.log(
    `generate-sitemap: wrote ${sorted.length} URLs to ${path.join(outDir, "sitemap.xml")}`
  );
}

main();
