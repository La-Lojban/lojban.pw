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
const { sluggify } = require("../lib/html-prettifier/slugger");

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

// Algolia has a ~10KB limit per record. We split by sections and chunk long sections.
const CHUNK_BYTES = 8000;

/** Anchor for URL hash; must match site heading ids (use same slugger as transformers). */
function headingToAnchor(text) {
  const cleaned = (text || "").replace(/<[^>]+>/g, "").trim();
  return cleaned ? sluggify(cleaned) : "section";
}

/** Split markdown body into sections by ## / ### etc. Returns [{ title, content }, ...]. */
function splitBySections(body) {
  const trimmed = (body || "").trim();
  if (!trimmed) return [{ title: "Content", content: "" }];
  const parts = trimmed.split(/\n(?=#{1,6}\s+)/);
  const sections = [];
  for (const part of parts) {
    const headingMatch = part.match(/^(#{1,6})\s+(.+?)(?:\n|$)/);
    if (headingMatch) {
      const rawTitle = headingMatch[2].replace(/<[^>]+>/g, "").trim();
      const content = part.slice(headingMatch[0].length).trim();
      sections.push({ title: rawTitle || "Section", content });
    } else {
      sections.push({
        title: "Introduction",
        content: part.trim(),
      });
    }
  }
  return sections.length ? sections : [{ title: "Content", content: trimmed }];
}

function sliceChunks(str, maxBytes) {
  const buf = Buffer.from(str, "utf8");
  const chunks = [];
  let start = 0;
  while (start < buf.length) {
    let end = Math.min(start + maxBytes, buf.length);
    let slice = buf.slice(start, end).toString("utf8");
    slice = slice.replace(/\uFFFD+$/, "").trim();
    if (slice) chunks.push(slice);
    start = end;
  }
  return chunks.length ? chunks : [""];
}

function buildRecords(relativePath, fullPath) {
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const slug = slugFromRelative(relativePath);
  const baseId = slug.join("-").replace(/[^a-zA-Z0-9_-]/g, "-");
  const baseUrl = "/" + slug.join("/") + "/";
  const firstHeaderMatch = content.match(/^#+\s+(.+)$/m);
  const pageTitle =
    data.title ||
    (firstHeaderMatch ? firstHeaderMatch[1].replace(/<[^>]+>/g, "").trim() : "") ||
    slug[slug.length - 1] ||
    "Untitled";
  const hierarchy = {};
  slug.forEach((part, i) => {
    hierarchy[`lvl${i}`] = part;
  });

  const body = (content || "").trim();
  const sections = splitBySections(body);
  const records = [];

  for (const section of sections) {
    const anchor = headingToAnchor(section.title);
    const url = section.content ? `${baseUrl}#${anchor}` : baseUrl;
    const contentChunks = sliceChunks(section.content, CHUNK_BYTES);
    const sectionTitle = section.title || "Section";

    for (let i = 0; i < contentChunks.length; i++) {
      const chunkContent = contentChunks[i];
      const objectID =
        contentChunks.length > 1
          ? `${baseId}-${anchor}-chunk-${i}`
          : `${baseId}-${anchor}`;
      records.push({
        objectID,
        url,
        title: sectionTitle,
        pageTitle,
        content: chunkContent,
        hierarchy,
      });
    }
  }

  return records;
}

async function main() {
  const mdPages = getMdPagesPath();
  if (!fs.existsSync(mdPages)) {
    console.warn("Algolia index: md_pages path not found:", mdPages);
    process.exit(0);
  }

  const files = getAllMdFiles(mdPages);
  const records = files.flatMap((rel) =>
    buildRecords(rel, path.join(mdPages, rel))
  );

  const client = algoliasearch(APP_ID, ADMIN_KEY);
  await client.saveObjects({
    indexName: INDEX_NAME,
    objects: records,
  });

  // Ensure title and content are searchable (otherwise e.g. "hello" in body won't match)
  await client.setSettings({
    indexName: INDEX_NAME,
    indexSettings: {
      searchableAttributes: [
        "title",
        "pageTitle",
        "content",
        "hierarchy.lvl0",
        "hierarchy.lvl1",
        "hierarchy.lvl2",
        "url",
      ],
      attributesToHighlight: ["title", "pageTitle", "content"],
      attributesToSnippet: ["content:20"],
    },
  });

  console.log(`Algolia index: pushed ${records.length} records to ${INDEX_NAME}`);
}

main().catch((err) => {
  console.error("Algolia index error:", err.message);
  process.exit(1);
});
