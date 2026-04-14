/**
 * Build-time downscale for book/korpora cover heroes (screen). Print/PDF keeps
 * full-size URLs via <picture><source media="print"> in components/post-body.tsx.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assetsRoot = path.join(root, "data", "assets");

function* walkMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) yield* walkMarkdownFiles(full);
    else if (ent.isFile() && ent.name.endsWith(".md")) yield full;
  }
}

function collectCoverPaths() {
  const urls = new Set();
  const roots = [
    path.join(root, "data", "pages"),
    path.join(root, "data", "assets", "korpora-tsv"),
  ];
  for (const rt of roots) {
    for (const file of walkMarkdownFiles(rt)) {
      let data;
      try {
        ({ data } = matter(fs.readFileSync(file, "utf8")));
      } catch {
        continue;
      }
      const c = data.coverImage;
      if (typeof c === "string" && c.startsWith("/assets/")) urls.add(c);
    }
  }
  return urls;
}

function assetPathFromUrl(url) {
  const rel = url.replace(/^\/assets\//, "");
  return path.join(assetsRoot, rel);
}

function heroUrlFromOriginal(url) {
  return url.replace(/\.(webp|png|jpe?g)$/i, "-hero.webp");
}

function heroAbsFromOriginalUrl(url) {
  return assetPathFromUrl(heroUrlFromOriginal(url));
}

const HERO_MAX_PX = 720;

async function processOne(url) {
  const srcAbs = assetPathFromUrl(url);
  if (!fs.existsSync(srcAbs)) {
    console.warn("[cover-hero] missing source:", srcAbs);
    return;
  }
  const destAbs = heroAbsFromOriginalUrl(url);
  const srcStat = fs.statSync(srcAbs);
  if (fs.existsSync(destAbs)) {
    const destStat = fs.statSync(destAbs);
    if (destStat.mtimeMs >= srcStat.mtimeMs) return;
  }
  const meta = await sharp(srcAbs).metadata();
  let w = meta.width ?? 0;
  let h = meta.height ?? 0;
  const o = meta.orientation;
  if (o != null && o >= 5 && o <= 8) [w, h] = [h, w];
  const needsResize =
    w > 0 && h > 0 && (w > HERO_MAX_PX || h > HERO_MAX_PX);

  let pipeline = sharp(srcAbs).rotate();
  if (needsResize) {
    pipeline = pipeline.resize({
      width: HERO_MAX_PX,
      height: HERO_MAX_PX,
      fit: "inside",
      withoutEnlargement: true,
    });
  }
  await pipeline.webp({ quality: 82, effort: 4 }).toFile(destAbs);
  console.log("[cover-hero] wrote", path.relative(root, destAbs));
}

const urls = [...collectCoverPaths()];
for (const u of urls) {
  await processOne(u);
}
console.log("[cover-hero] done,", urls.length, "source(s)");
