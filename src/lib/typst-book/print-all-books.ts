/**
 * Generate all book PDFs via Typst (discovery: every `data/pages/<lang>/books/*.md` index):
 * every `data/pages/<lang>/books/*.md` index for each language in `config/locales.json`.
 *
 * Optional (local dev only): `PDF_TYPUST_ONLY_LEARN_LOJBAN=1` limits the queue to
 * `learn-lojban.md` per language. CI should not set this.
 *
 * Outputs `*-pre.pdf` under the vreji tree; run `pnpm print` (or `shrink-pdf.sh` after Typst)
 * to produce download `*.pdf` files.
 */
import fs from "fs";
import path from "path";
import { sluggify } from "../html-prettifier/slugger";
import { getMdPagesPath, getSrcPath, getVrejiPath } from "../paths";
import locales from "../../config/locales.json";
import { buildBookTypst } from "./build-learn-lojban";

const { languages } = locales;
const allLanguages = Object.keys(languages);
const DEFAULT_MAX_CONCURRENCY = 2;

function parseMaxConcurrency(raw: string | undefined): number {
  if (!raw) return DEFAULT_MAX_CONCURRENCY;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n <= 0) {
    console.warn(
      `Invalid PDF_TYPUST_MAX_CONCURRENCY=${JSON.stringify(raw)}; using ${DEFAULT_MAX_CONCURRENCY}.`
    );
    return DEFAULT_MAX_CONCURRENCY;
  }
  return n;
}

async function main() {
  const mdPagesPath = getMdPagesPath();
  const vrejiPath = getVrejiPath();
  const srcPath = getSrcPath();
  // Typst `--root` is project root (`/app` in Docker), so temp sources must stay under it.
  const typstTmpRoot = path.resolve(srcPath, "..", "tmp", "typst-book");
  const jobs: { bookMdPath: string; outPdfPath: string; workDir: string }[] = [];

  for (const lang of allLanguages) {
    const shortLang = languages[lang as keyof typeof languages].short;
    const dirPath = path.join(mdPagesPath, shortLang, "books");
    if (!fs.existsSync(dirPath)) continue;

    for (const f of fs.readdirSync(dirPath)) {
      if (!f.endsWith(".md")) continue;
      const slug = sluggify(f.replace(/\.md$/, ""));
      jobs.push({
        bookMdPath: path.join(dirPath, f),
        /** Typst writes `*-pre.pdf`; `lib/printer/shrink-pdf.sh` shrinks to `*.pdf` (same slug). */
        outPdfPath: path.join(vrejiPath, "uencu", shortLang, `${slug}-pre.pdf`),
        /**
         * Keep per-language subdirs so same-named books in different locales can compile in parallel
         * without sharing tmp files (body.typ/main.typ/images).
         */
        workDir: path.join(typstTmpRoot, shortLang, slug),
      });
    }
  }

  /** Local testing only: restrict to `learn-lojban.md` per language (CI builds the full queue). */
  const learnOnly =
    process.env.PDF_TYPUST_ONLY_LEARN_LOJBAN === "1" ||
    process.env.PDF_TYPUST_ONLY_LEARN_LOJBAN === "true";
  const filtered = learnOnly
    ? jobs.filter((j) => /[/\\]learn-lojban\.md$/i.test(j.bookMdPath))
    : jobs;
  const maxConcurrency = parseMaxConcurrency(process.env.PDF_TYPUST_MAX_CONCURRENCY);

  console.log(
    `Typst PDF queue: ${filtered.length} book(s) (max concurrency: ${maxConcurrency})` +
      (learnOnly ? " (PDF_TYPUST_ONLY_LEARN_LOJBAN: learn-lojban only)" : "")
  );
  let nextIdx = 0;
  let firstError: Error | null = null;

  const workerCount = Math.min(maxConcurrency, Math.max(filtered.length, 1));
  const workers = Array.from({ length: workerCount }, (_unused, workerIdx) =>
    (async () => {
      while (true) {
        if (firstError) return;
        const idx = nextIdx;
        nextIdx += 1;
        if (idx >= filtered.length) return;
        const job = filtered[idx]!;
        try {
          console.log(
            `[worker ${workerIdx + 1}/${workerCount}] (${idx + 1}/${filtered.length}) ${job.bookMdPath}`
          );
          await buildBookTypst(job);
        } catch (e) {
          firstError =
            e instanceof Error ? e : new Error(typeof e === "string" ? e : String(e));
          return;
        }
      }
    })()
  );
  await Promise.all(workers);
  if (firstError) {
    throw firstError;
  }
  console.log("Typst PDF queue done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
