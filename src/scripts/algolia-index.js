/**
 * Index markdown pages to Algolia. Run in CI or locally with:
 *   ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY, ALGOLIA_INDEX_NAME set.
 * Uses the full algoliasearch client (write); search-only key will not work.
 */
const path = require("path");
const fs = require("fs");
const matter = require("gray-matter");
const { algoliasearch } = require("algoliasearch");
const { getMdPagesPath } = require("../lib/paths");

const APP_ID = process.env.ALGOLIA_APP_ID;
const ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;
const INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

if (!APP_ID || !ADMIN_KEY || !INDEX_NAME) {
  console.log(
    "Algolia index: skipped (set ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY, ALGOLIA_INDEX_NAME to index)"
  );
  process.exit(0);
}

function shouldSkipDir(name) {
  return name.startsWith(".");
}

function getAllMdFiles(dir, baseDir = dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!shouldSkipDir(e.name)) getAllMdFiles(full, baseDir, acc);
    } else if (e.name.endsWith(".md")) {
      acc.push(path.relative(baseDir, full));
    }
  }
  return acc;
}

function slugFromRelative(relativePath) {
  return relativePath.replace(/\.md$/, "").split(path.sep);
}

function buildRecord(relativePath, fullPath) {
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const slug = slugFromRelative(relativePath);
  const objectID = slug.join("-").replace(/[^a-zA-Z0-9_-]/g, "-");
  const url = "/" + slug.join("/") + "/";
  const firstHeaderMatch = content.match(/^#+\s+(.+)$/m);
  const title =
    data.title ||
    (firstHeaderMatch ? firstHeaderMatch[1].replace(/<[^>]+>/g, "").trim() : "") ||
    slug[slug.length - 1] ||
    "Untitled";
  const contentSnippet = (content || "").slice(0, 500).trim();
  const hierarchy = {};
  slug.forEach((part, i) => {
    hierarchy[`lvl${i}`] = part;
  });

  return {
    objectID,
    url,
    title,
    content: contentSnippet,
    hierarchy,
  };
}

async function main() {
  const mdPages = getMdPagesPath();
  if (!fs.existsSync(mdPages)) {
    console.warn("Algolia index: md_pages path not found:", mdPages);
    process.exit(0);
  }

  const files = getAllMdFiles(mdPages);
  const records = files.map((rel) =>
    buildRecord(rel, path.join(mdPages, rel))
  );

  const client = algoliasearch(APP_ID, ADMIN_KEY);
  await client.saveObjects({
    indexName: INDEX_NAME,
    objects: records,
  });

  console.log(`Algolia index: pushed ${records.length} records to ${INDEX_NAME}`);
}

main().catch((err) => {
  console.error("Algolia index error:", err.message);
  process.exit(1);
});
