#!/usr/bin/env node
/*
 * Emit every URL from the live sitemap, one per line on stdout.
 *
 * The `CI/CD with Docker` workflow publishes `/sitemap.xml` via
 * scripts/generate-sitemap.js, so its contents are exactly the pages that
 * exist on https://lojban.pw/. Auditing anything else (e.g. a locale-root
 * like `/en/` that isn't a real page) causes Lighthouse to 404 and aborts
 * the whole `lhci collect` batch.
 *
 * Usage:
 *   node scripts/lighthouse-urls.cjs [--base=https://lojban.pw]
 *
 * No filtering, no sampling — every `<loc>` in the sitemap is emitted as-is.
 */

const DEFAULT_BASE = 'https://lojban.pw';

function parseArgs(argv) {
  const opts = { base: DEFAULT_BASE };
  for (const a of argv) {
    if (a.startsWith('--base=')) opts.base = a.slice(7).replace(/\/+$/, '');
    else if (a.startsWith('--')) {
      console.error(`Unknown flag: ${a}`);
      process.exit(2);
    }
  }
  return opts;
}

async function fetchSitemap(base) {
  const url = `${base}/sitemap.xml`;
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${res.status}`);
  }
  return res.text();
}

function extractUrls(xml) {
  // Cheap regex extraction — sitemap is a flat <urlset>; no namespaces to resolve.
  const out = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) out.push(m[1].trim());
  return out;
}

async function main() {
  // Swallow EPIPE so piping to `head` / `grep -m` locally doesn't surface a
  // stack trace. CI writes to a file and never triggers this.
  process.stdout.on('error', (err) => {
    if (err.code === 'EPIPE') process.exit(0);
    throw err;
  });

  const opts = parseArgs(process.argv.slice(2));
  const xml = await fetchSitemap(opts.base);
  const urls = [...new Set(extractUrls(xml))].sort();

  if (urls.length === 0) {
    console.error(`No URLs found in sitemap at ${opts.base}/sitemap.xml`);
    process.exit(1);
  }

  for (const u of urls) process.stdout.write(u + '\n');
}

main().catch((err) => {
  console.error(err.stack || err.message || String(err));
  process.exit(1);
});
