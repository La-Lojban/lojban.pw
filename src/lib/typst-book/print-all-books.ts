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
import { getMdPagesPath, getVrejiPath } from "../paths";
import locales from "../../config/locales.json";
import { buildBookTypst } from "./build-learn-lojban";

const { languages } = locales;
const allLanguages = Object.keys(languages);

async function main() {
  const mdPagesPath = getMdPagesPath();
  const vrejiPath = getVrejiPath();
  const jobs: { bookMdPath: string; outPdfPath: string }[] = [];

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

  console.log(
    `Typst PDF queue: ${filtered.length} book(s) (sequential)` +
      (learnOnly ? " (PDF_TYPUST_ONLY_LEARN_LOJBAN: learn-lojban only)" : "")
  );
  for (const job of filtered) {
    console.log(`… ${job.bookMdPath}`);
    await buildBookTypst(job);
  }
  console.log("Typst PDF queue done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
