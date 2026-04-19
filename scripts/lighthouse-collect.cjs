#!/usr/bin/env node
/*
 * Run `lhci collect` once per URL so a single timeout / crash does not abort
 * the rest of the sitemap. Writes `.lighthouseci/collection-failures.json`
 * for lighthouse-summary.cjs.
 *
 * Usage:
 *   node scripts/lighthouse-collect.cjs <urls.txt> [numberOfRuns]
 *
 * Exits 0 after processing every line (failures are recorded, not fatal).
 */
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const LHCI_PKG = '@lhci/cli@0.15.1';
const LHCI_DIR = path.join(process.cwd(), '.lighthouseci');

const urlsFile = process.argv[2] || 'urls.txt';
const numberOfRuns = String(parseInt(process.argv[3] || '1', 10) || 1);

if (!fs.existsSync(urlsFile)) {
  console.error(`URLs file not found: ${urlsFile}`);
  process.exit(1);
}

const urls = fs
  .readFileSync(urlsFile, 'utf8')
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean);

if (urls.length === 0) {
  console.error('No URLs in list');
  process.exit(1);
}

if (fs.existsSync(LHCI_DIR)) {
  fs.rmSync(LHCI_DIR, { recursive: true, force: true });
}
fs.mkdirSync(LHCI_DIR, { recursive: true });

/** @type {{ url: string, exitCode: number|null, signal: string|null, snippet: string }[]} */
const failures = [];

let useAdditive = false;

for (const url of urls) {
  const args = [
    '--yes',
    LHCI_PKG,
    'collect',
    '--config=./.lighthouserc.cjs',
    `--numberOfRuns=${numberOfRuns}`,
    '--url',
    url,
  ];
  if (useAdditive) args.push('--additive');

  process.stdout.write(`\n[lighthouse-collect] ${url}\n`);
  const r = spawnSync('npx', args, {
    stdio: 'inherit',
    env: process.env,
    encoding: 'utf8',
  });

  if (r.status !== 0) {
    failures.push({
      url,
      exitCode: r.status,
      signal: r.signal,
      snippet: collectSnippetFromLhciDir(url),
    });
    process.stderr.write(`[lighthouse-collect] FAILED (exit ${r.status}) ${url}\n`);
  } else {
    useAdditive = true;
  }
}

fs.writeFileSync(path.join(LHCI_DIR, 'collection-failures.json'), JSON.stringify(failures, null, 2));

process.stdout.write(
  `\n[lighthouse-collect] done: ${urls.length - failures.length} ok, ${failures.length} failed\n`
);
process.exit(0);

/**
 * If the last lhr-*.json in .lighthouseci matches this URL, read runtimeError.
 */
function collectSnippetFromLhciDir(requestedUrl) {
  try {
    const files = fs.readdirSync(LHCI_DIR).filter((f) => /^lhr-\d+\.json$/.test(f));
    if (!files.length) return '';
    const byMtime = files
      .map((f) => ({ f, t: fs.statSync(path.join(LHCI_DIR, f)).mtimeMs }))
      .sort((a, b) => b.t - a.t);
    const raw = fs.readFileSync(path.join(LHCI_DIR, byMtime[0].f), 'utf8');
    const lhr = JSON.parse(raw);
    if (lhr.requestedUrl !== requestedUrl && lhr.finalUrl !== requestedUrl) return '';
    const err = lhr.runtimeError;
    if (!err) return '';
    return `${err.code || 'error'}: ${(err.message || '').slice(0, 200)}`;
  } catch {
    return '';
  }
}
