/**
 * Download Google Spreadsheet tabs whose titles start with "+", filter columns
 * (! prefix or empty skipped), localize headers from config/locales.json, write TSVs to archive/cnino_korpora.
 *
 * Requires in src/.env (or repo .env): GOOGLE_LOJBAN_CORPUS_DOC_ID, GOOGLE_READONLY_API_KEY
 *
 * Run from `src/`: `pnpm korpora:cnino` or `npx tsx scripts/korpora.ts`
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import {
  GoogleSpreadsheet,
  type GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.resolve(__dirname, "..");
const projectRoot = path.resolve(srcRoot, "..");

dotenv.config({ path: path.join(srcRoot, ".env") });
dotenv.config({ path: path.join(projectRoot, ".env") });

type LangInfo = { native?: string; short?: string };
const locales = JSON.parse(
  fs.readFileSync(path.join(srcRoot, "config", "locales.json"), "utf-8"),
) as { languages: Record<string, LangInfo> };
const { languages } = locales;
const langOrder = Object.keys(languages);

const ARCHIVE_REL = path.join("archive", "cnino_korpora");

function sanitizeTsvValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\t/g, " ").replace(/\r?\n/g, " ").trim();
}

function headerLangKey(raw: string): string {
  return raw.split("||")[0].trim();
}

function localizeColumnHeader(raw: string): string {
  const parts = raw.split("||");
  const key = parts[0].trim();
  const rest = parts.slice(1).join("||");
  const info = languages[key];
  if (info?.native && info?.short) {
    const label = `${info.native} (${info.short})`;
    return rest ? `${label}||${rest}` : label;
  }
  return raw.trim();
}

function shouldIncludeColumn(header: string | null | undefined): boolean {
  if (header === null || header === undefined) return false;
  const t = String(header).trim();
  if (!t) return false;
  if (t.startsWith("!")) return false;
  return true;
}

function sortColumnsForExport(
  originals: string[],
): { original: string; display: string }[] {
  const order = new Map(langOrder.map((k, i) => [k, i]));
  const mapped = originals.map((original) => ({
    original,
    display: localizeColumnHeader(original),
  }));
  return mapped.sort((a, b) => {
    const ak = headerLangKey(a.original);
    const bk = headerLangKey(b.original);
    const ai = order.has(ak) ? (order.get(ak) as number) : 9999;
    const bi = order.has(bk) ? (order.get(bk) as number) : 9999;
    if (ai !== bi) return ai - bi;
    return a.original.localeCompare(b.original);
  });
}

/** Filename slug (aligned with html-prettifier/slugger when present). */
function slugForFilename(title: string): string {
  const cleaned = title.replace(/^\+/, "").trim();
  return (
    cleaned
      .toLowerCase()
      .replace(/[\s/\\]+/g, "-")
      .replace(/[^a-z0-9\u0080-\uFFFF-]+/g, "")
      .replace(/^-+|-+$/g, "") || "sheet"
  );
}

async function sheetToTsv(sheet: GoogleSpreadsheetWorksheet): Promise<string> {
  await sheet.loadHeaderRow(1);
  const rawHeaders = sheet.headerValues ?? [];

  const originals = rawHeaders
    .map((h) => (h == null ? "" : String(h)))
    .filter((h) => shouldIncludeColumn(h));

  if (originals.length === 0) return "";

  const sorted = sortColumnsForExport(originals);

  const rows = await sheet.getRows();
  const lines: string[] = [];

  lines.push(sorted.map((c) => sanitizeTsvValue(c.display)).join("\t"));

  for (const row of rows) {
    const line = sorted.map((c) =>
      sanitizeTsvValue(row.get(c.original)),
    );
    lines.push(line.join("\t"));
  }

  return lines.join("\n");
}

async function main(): Promise<void> {
  const docId = process.env.GOOGLE_LOJBAN_CORPUS_DOC_ID;
  const apiKey = process.env.GOOGLE_READONLY_API_KEY;

  if (!docId) {
    console.error("Missing GOOGLE_LOJBAN_CORPUS_DOC_ID in .env");
    process.exit(1);
  }
  if (!apiKey) {
    console.error("Missing GOOGLE_READONLY_API_KEY in .env");
    process.exit(1);
  }

  const outDir = path.join(projectRoot, ARCHIVE_REL);
  fs.mkdirSync(outDir, { recursive: true });

  const doc = new GoogleSpreadsheet(docId, { apiKey });
  await doc.loadInfo();

  const plusSheets = doc.sheetsByIndex.filter((s) => s.title.startsWith("+"));

  if (plusSheets.length === 0) {
    console.warn('No sheets with titles starting with "+". Nothing to write.');
    return;
  }

  for (const sheet of plusSheets) {
    const cleanTitle = sheet.title.replace(/^\+/, "").trim();
    const baseSlug = slugForFilename(cleanTitle || "sheet");
    const tsv = await sheetToTsv(sheet);
    if (!tsv) {
      console.warn(`Skipping empty sheet: ${sheet.title}`);
      continue;
    }
    const filePath = path.join(outDir, `${baseSlug}.tsv`);
    fs.writeFileSync(filePath, tsv, "utf-8");
    console.log(`Wrote ${path.relative(projectRoot, filePath)}`);
  }

  console.log(`Done. Output directory: ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
