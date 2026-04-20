#!/usr/bin/env node
/*
 * Render a Markdown summary of an lhci run to stdout.
 *
 * Usage:
 *   node scripts/lighthouse-summary.cjs <lhci-dir> <preset-label>
 *
 * Consumes .lighthouseci/manifest.json + links.json + individual lhr-*.json
 * files emitted by `@lhci/cli autorun`. Intended target is $GITHUB_STEP_SUMMARY.
 */
const fs = require('node:fs');
const path = require('node:path');

const lhciDir = process.argv[2] || '.lighthouseci';
const presetLabel = process.argv[3] || '';

if (!fs.existsSync(lhciDir)) {
  process.stdout.write(`## Lighthouse ${presetLabel}: no results directory (${lhciDir})\n`);
  process.exit(0);
}

const manifestPath = path.join(lhciDir, 'manifest.json');
const linksPath = path.join(lhciDir, 'links.json');

if (!fs.existsSync(manifestPath)) {
  process.stdout.write(`## Lighthouse ${presetLabel}: manifest missing — collector likely failed\n`);
  process.exit(0);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const links = fs.existsSync(linksPath) ? JSON.parse(fs.readFileSync(linksPath, 'utf8')) : {};

const failuresPath = path.join(lhciDir, 'collection-failures.json');
const collectionFailures = fs.existsSync(failuresPath)
  ? JSON.parse(fs.readFileSync(failuresPath, 'utf8'))
  : [];

const medianRows = manifest.filter((r) => r.isRepresentativeRun);
const runsPerUrl = medianRows.length ? manifest.length / medianRows.length : 0;

const fmtMs = (v) => (v == null ? 'n/a' : `${Math.round(v)} ms`);
const fmtScore = (v) => (v == null ? null : Math.round(v * 100));
const grade = (score) => {
  if (score == null) return '⚪';
  if (score >= 90) return '🟢';
  if (score >= 50) return '🟡';
  return '🔴';
};

const lhrFileFor = (url) => {
  for (const f of fs.readdirSync(lhciDir)) {
    if (!f.startsWith('lhr-') || !f.endsWith('.json')) continue;
    try {
      const lhr = JSON.parse(fs.readFileSync(path.join(lhciDir, f), 'utf8'));
      if (lhr.finalUrl === url || lhr.requestedUrl === url) {
        return lhr;
      }
    } catch {
      // skip unreadable
    }
  }
  return null;
};

let out = '';
out += `## 🚦 Lighthouse — ${presetLabel} (median of ${runsPerUrl || '?'} runs)\n\n`;
if (collectionFailures.length) {
  out += `**${collectionFailures.length} URL(s)** failed during collect (timeout, DNS, etc.) — see table at bottom.\n\n`;
}
out += `Commit: \`${(process.env.GITHUB_SHA || 'n/a').slice(0, 7)}\` · `;
out += `Run: [#${process.env.GITHUB_RUN_ID}](${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID})\n\n`;

out += '| URL | Perf | A11y | BP | SEO | LCP | FCP | CLS | TBT | TTI | SI |\n';
out += '|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|\n';

if (!medianRows.length) {
  out +=
    '| _no successful runs_ | — | — | — | — | — | — | — | — | — | — |\n';
}

for (const r of medianRows) {
  const s = r.summary;
  const shortUrl = r.url.replace(/^https?:\/\/[^/]+/, '') || '/';
  const reportLink = links[r.url] ? `[${shortUrl}](${links[r.url]})` : shortUrl;

  const perf = fmtScore(s.performance);
  const a11y = fmtScore(s.accessibility);
  const bp = fmtScore(s['best-practices']);
  const seo = fmtScore(s.seo);

  const lhr = lhrFileFor(r.url);
  const a = lhr ? lhr.audits : {};
  const lcp = a['largest-contentful-paint']?.numericValue;
  const fcp = a['first-contentful-paint']?.numericValue;
  const cls = a['cumulative-layout-shift']?.numericValue;
  const tbt = a['total-blocking-time']?.numericValue;
  const tti = a['interactive']?.numericValue;
  const si = a['speed-index']?.numericValue;

  out += `| ${reportLink} `;
  out += `| ${grade(perf)} ${perf ?? 'n/a'} `;
  out += `| ${grade(a11y)} ${a11y ?? 'n/a'} `;
  out += `| ${grade(bp)} ${bp ?? 'n/a'} `;
  out += `| ${grade(seo)} ${seo ?? 'n/a'} `;
  out += `| ${fmtMs(lcp)} `;
  out += `| ${fmtMs(fcp)} `;
  out += `| ${cls == null ? 'n/a' : cls.toFixed(3)} `;
  out += `| ${fmtMs(tbt)} `;
  out += `| ${fmtMs(tti)} `;
  out += `| ${fmtMs(si)} |\n`;
}

if (collectionFailures.length) {
  out += '\n### Pages that did not complete (collect failed)\n\n';
  out += '| URL | Error / detail |\n';
  out += '|---|---|\n';
  for (const f of collectionFailures) {
    const shortUrl = f.url.replace(/^https?:\/\/[^/]+/, '') || '/';
    const detail =
      (f.snippet && String(f.snippet).trim()) ||
      (f.exitCode != null ? `Lighthouse exited with code ${f.exitCode}` : '') ||
      'unknown';
    const safe = String(detail).replace(/\|/g, '\\|').replace(/\n/g, ' ');
    out += `| \`${shortUrl}\` | ${safe} |\n`;
  }
}

out += '\n**Legend**: 🟢 ≥ 90 · 🟡 50–89 · 🔴 < 50\n';
out += '\n**Budgets** (warn-only): LCP ≤ 2500 ms · FCP ≤ 1800 ms · CLS ≤ 0.1 · TBT ≤ 200 ms · TTI ≤ 3800 ms · SI ≤ 3400 ms\n';
out += `\nDownload the \`lighthouse-reports-${presetLabel}-*\` artifact (this run) for full HTML reports with remediation steps per audit.\n`;

process.stdout.write(out);
