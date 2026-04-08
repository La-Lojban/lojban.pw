/**
 * Local korpora corpus: `data/assets/korpora-tsv/*.tsv` (+ optional same-named `*.md` preamble).
 * Shared by the Next.js route and the korpora maintenance script.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sluggify } from "../html-prettifier/slugger";
import locales from "../../config/locales.json";
import { getKorporaTsvPath, getPublicAssetsPath } from "../paths";

type LangRecord = Record<string, { native?: string; short?: string; direction?: string }>;
const langInfo = (locales as { languages: LangRecord }).languages;
/** Sheet column keys (`glico`, `lojbo`, …) — same set the old generator used for front matter. */
export const korporaLanguageKeys = Object.keys(langInfo);

export interface ProcessedCorpusData {
  headers: Record<string, { header: string; priority: number; author: string; description: string }>;
  slug: string;
  keywords: string;
  ogImage: string | undefined;
  columns: Record<string, string[]>;
  langs: string[];
  figurePlacements: { beforeDataRow: number; src: string }[];
  rowKinds: ("heading" | "meta" | "body")[];
  nowrapColIds: string[];
  rtlColIds: string[];
  columnsWithTables: Record<string, boolean>;
  basename: string;
}

export function cssifyName(text: string): string {
  return text.replace(
    /[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~\s]/g,
    "_"
  );
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function prettifyGraymatter(str: string): string {
  return str
    .replace(/[\r\n]/g, " ")
    .replace(/ {2,}/g, " ")
    .replace(/:/g, "");
}

function parseTableCell(cellContent: string | null | undefined): string {
  if (!cellContent) return "";
  const rows = cellContent.split("||");
  let tableHtml =
    '<table class="inner-table w-full border-collapse border border-gray-300">';
  rows.forEach((row) => {
    const cells = row.split("|");
    tableHtml += "<tr>";
    cells.forEach((cell) => {
      tableHtml += `<td class="border border-gray-300 px-2 py-1">${escapeHtml(cell.trim())}</td>`;
    });
    tableHtml += "</tr>";
  });
  tableHtml += "</table>";
  return tableHtml;
}

/** URL param `lang` is the locale short code (`en`, `eo`, …). Map to sheet column key (`glico`, …). */
export function langKeyFromShort(short: string): string {
  const entry = Object.entries(langInfo).find(([, v]) => v.short === short);
  return entry?.[0] ?? "glico";
}

export function shortFromLangKey(langKey: string): string {
  return langInfo[langKey]?.short ?? langKey;
}

export function listKorporaTsvBasenames(): string[] {
  const dir = getKorporaTsvPath();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(".tsv"))
    .map((d) => path.parse(d.name).name)
    .sort();
}

function parseTsvRows(raw: string): {
  langs: string[];
  columns: Record<string, string[]>;
  columnsWithTables: Record<string, boolean>;
} {
  const lines = raw.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) {
    throw new Error("Korpora TSV needs a header row and at least one data row.");
  }
  const headerCells = lines[0].split("\t").map((h) => h.trim());
  const langs = headerCells.filter((h) => !h.startsWith("!"));
  const n = langs.length;
  const columns: Record<string, string[]> = {};
  const columnsWithTables: Record<string, boolean> = {};
  for (const lang of langs) {
    columns[lang] = [];
    if (lang.includes("||")) columnsWithTables[lang] = true;
  }
  for (let r = 1; r < lines.length; r++) {
    const parts = lines[r].split("\t");
    while (parts.length < n) parts.push("");
    const vals = parts.slice(0, n).map((c) => c ?? "");
    langs.forEach((lang, i) => {
      columns[lang].push(vals[i] ?? "");
    });
  }
  return { langs, columns, columnsWithTables };
}

function orderLangsForPage(sheetLangs: string[], pageLangKey: string): string[] {
  if (sheetLangs.includes(pageLangKey)) {
    return [pageLangKey, ...sheetLangs.filter((l) => l !== pageLangKey)];
  }
  return [...sheetLangs];
}

function processColumnsToCorpus(
  basename: string,
  langs: string[],
  columns: Record<string, string[]>,
  columnsWithTables: Record<string, boolean>
): ProcessedCorpusData {
  const slug = sluggify(columns["glico"]?.[1] ?? basename);
  const priority = (columns["lojbo"] ?? []).slice(4).join("\n").length;
  const headers: ProcessedCorpusData["headers"] = {};

  korporaLanguageKeys.forEach((lang) => {
    const header = prettifyGraymatter(
      columns[lang]?.[1] ?? columns["glico"]?.[1] ?? basename
    );
    const author = prettifyGraymatter(
      columns[lang]?.[2] ?? columns["glico"]?.[2] ?? ""
    );
    const translatedBy = prettifyGraymatter(
      columns[lang]?.[3] ?? columns["glico"]?.[3] ?? ""
    );
    headers[lang] = {
      header,
      priority,
      author,
      description: `${author} | ${translatedBy}`
        .trim()
        .replace(/ -$/, "")
        .trim(),
    };
  });

  const keywords = Object.keys(columns)
    .map((langKey) => columns[langKey]?.[1])
    .filter((column) => !!column)
    .join(", ");

  const rowCount = columns[langs[0]]?.length ?? 0;
  const italicizedRows: number[] = [];

  const rowKinds: ("heading" | "meta" | "body")[] = [];
  for (let indexNum = 0; indexNum < rowCount; indexNum++) {
    let kind: "heading" | "meta" | "body" = "body";
    if (indexNum === 0) kind = "heading";
    else if (indexNum < 4 || italicizedRows.includes(indexNum + 1)) kind = "meta";
    rowKinds.push(kind);
  }

  let ogImage: string | undefined;
  const figurePlacements: { beforeDataRow: number; src: string }[] = [];
  const publicAssetsPath = getPublicAssetsPath();
  const imageExtensions = ["svg", "png", "webp"];

  for (let indexNum = 0; indexNum < rowCount; indexNum++) {
    const lineNo = indexNum + 1;
    let candidatePath = "";
    for (const ext of imageExtensions) {
      const candidate = path.join(
        publicAssetsPath,
        "pixra",
        "texts",
        slug,
        `${lineNo}.${ext}`
      );
      if (fs.existsSync(candidate)) {
        candidatePath = path.join(
          "/assets",
          "pixra",
          "texts",
          slug,
          `${lineNo}.${ext}`
        );
        break;
      }
    }
    if (candidatePath) {
      ogImage = ogImage ?? candidatePath;
      figurePlacements.push({ beforeDataRow: indexNum, src: candidatePath });
    }
  }

  if (!ogImage) {
    const pixraDir = path.join(publicAssetsPath, "pixra", "texts", slug);
    if (fs.existsSync(pixraDir)) {
      const exts = new Set([".webp", ".png", ".svg", ".jpg", ".jpeg"]);
      const imageFiles = fs
        .readdirSync(pixraDir)
        .filter((name) => exts.has(path.extname(name).toLowerCase()))
        .sort();
      if (imageFiles.length > 0) {
        ogImage = path
          .join("/assets", "pixra", "texts", slug, imageFiles[0])
          .replace(/\\/g, "/");
      }
    }
  }

  const nowrapColIds = langs
    .filter((l: string) => l.includes("||"))
    .map((l: string) => cssifyName(l));
  const rtlColIds = langs
    .filter((l: string) => langInfo[l]?.direction === "RTL")
    .map((l: string) => cssifyName(l));

  return {
    headers,
    slug,
    keywords,
    ogImage,
    columns,
    langs,
    figurePlacements,
    rowKinds,
    nowrapColIds,
    rtlColIds,
    columnsWithTables,
    basename,
  };
}

export function loadProcessedCorpusFromTsv(basename: string): ProcessedCorpusData | null {
  const dir = getKorporaTsvPath();
  const tsvPath = path.join(dir, `${basename}.tsv`);
  if (!fs.existsSync(tsvPath)) return null;
  const raw = fs.readFileSync(tsvPath, "utf-8");
  const { langs, columns, columnsWithTables } = parseTsvRows(raw);
  return processColumnsToCorpus(basename, langs, columns, columnsWithTables);
}

export function getPreambleMdPath(basename: string): string {
  return path.join(getKorporaTsvPath(), `${basename}.md`);
}

/** Optional `data/assets/korpora-tsv/<basename>.md` — frontmatter (`name`, `author`, …) + optional preamble body. */
const sidecarCache = new Map<
  string,
  { name?: string; title?: string; author?: string } | null
>();

function readKorporaSidecarFields(basename: string): {
  name?: string;
  title?: string;
  author?: string;
} {
  if (sidecarCache.has(basename)) {
    const c = sidecarCache.get(basename);
    return c ?? {};
  }
  const mdPath = getPreambleMdPath(basename);
  if (!fs.existsSync(mdPath)) {
    sidecarCache.set(basename, null);
    return {};
  }
  const raw = fs.readFileSync(mdPath, "utf-8");
  const { data } = matter(raw);
  const d = data as Record<string, unknown>;
  const out = {
    name: typeof d.name === "string" ? d.name : undefined,
    title: typeof d.title === "string" ? d.title : undefined,
    author: typeof d.author === "string" ? d.author : undefined,
  };
  sidecarCache.set(basename, out);
  return out;
}

/** Listing / preview title: `name` or `title` in sidecar, else TSV-derived title. */
export function resolveKorporaDisplayTitle(
  basename: string,
  tsvFallbackTitle: string
): string {
  const s = readKorporaSidecarFields(basename);
  const fromFm = (s.name ?? s.title)?.trim();
  return fromFm || tsvFallbackTitle;
}

/** Author line for listings and header: sidecar `author` if set, else TSV-derived. */
export function resolveKorporaAuthorLine(
  basename: string,
  tsvFallbackAuthor: string
): string {
  const s = readKorporaSidecarFields(basename);
  const a = s.author?.trim();
  return a || tsvFallbackAuthor;
}

/** Markdown body only (frontmatter stripped) for rendering below the corpus table. */
export function readKorporaPreambleBodyMarkdown(basename: string): string {
  const mdPath = getPreambleMdPath(basename);
  if (!fs.existsSync(mdPath)) return "";
  const raw = fs.readFileSync(mdPath, "utf-8");
  const { content } = matter(raw);
  return content.trim();
}

export function buildKorporaSectionHtml(
  data: ProcessedCorpusData,
  pageLangKey: string
): string {
  const {
    slug,
    columns,
    langs,
    figurePlacements,
    rowKinds,
    nowrapColIds,
    rtlColIds,
    columnsWithTables,
  } = data;

  const langsOrdered = orderLangsForPage(langs, pageLangKey);
  const colIds = langsOrdered.map((l) => cssifyName(l));
  const nowrapSet = new Set(nowrapColIds);
  const rtlSet = new Set(rtlColIds);

  const buttons = langsOrdered.map((lang) => {
    const cssfiedLangName = cssifyName(lang);
    const prettifiedLang = lang.replace(/\|\|/g, "").trim();
    const btnLabel =
      langInfo[lang]?.native ??
      langInfo[prettifiedLang]?.native ??
      prettifiedLang;
    return `<button type="button" class="korpora__toggle" data-korpora-col="${cssfiedLangName}" aria-pressed="false">${escapeHtml(btnLabel)}</button>`;
  });

  const rowCount = columns[langs[0]]?.length ?? 0;
  const nCols = langsOrdered.length;

  const bodyRows: string[] = [];
  const figureAtRow = new Map(
    figurePlacements.map((f) => [f.beforeDataRow, f.src] as const)
  );

  for (let indexNum = 0; indexNum < rowCount; indexNum++) {
    const figSrc = figureAtRow.get(indexNum);
    if (figSrc) {
      bodyRows.push(`<tr class="korpora__row korpora__row--figure">
          <td class="korpora__figure-cell" colspan="${nCols}">
          <div class="korpora__figure-wrap">
          <img class="korpora__figure-img" src="${escapeHtml(figSrc)}" alt="" />
          </div>
          </td>
        </tr>`);
    }

    const kind = rowKinds[indexNum] ?? "body";
    const tds: string[] = [];
    for (const lang of langsOrdered) {
      const colId = cssifyName(lang);
      let cellContent = columns[lang]?.[indexNum] ?? "";
      if (columnsWithTables[lang] && cellContent.includes("|")) {
        cellContent = parseTableCell(cellContent);
      } else {
        cellContent = escapeHtml(cellContent);
      }
      const tdClass = [
        "korpora__td",
        kind === "heading" ? "korpora__td--heading" : "",
        kind === "meta" ? "korpora__td--meta" : "",
        rtlSet.has(colId) ? "korpora__td--rtl" : "",
      ]
        .filter(Boolean)
        .join(" ");
      const nowrapAttr = nowrapSet.has(colId) ? ' data-korpora-nowrap=""' : "";
      tds.push(
        `<td class="${tdClass}"${nowrapAttr} data-korpora-col="${colId}">${cellContent}</td>`
      );
    }
    bodyRows.push(`<tr class="korpora__row">${tds.join("")}</tr>`);
  }

  const ths = langsOrdered.map((lang) => {
    const colId = cssifyName(lang);
    const prettifiedLang = lang.replace(/\|\|/g, "").trim();
    const nowrapAttr = nowrapSet.has(colId) ? ' data-korpora-nowrap=""' : "";
    return `<th scope="col" class="korpora__th"${nowrapAttr} data-korpora-col="${colId}">${escapeHtml(prettifiedLang)}</th>`;
  });

  // Initial --korpora-visible-cols is baked into static HTML at SSG/build time; KorporaTableClient updates it when users toggle columns.
  const tableHtml = `<table data-korpora-grid class="korpora__table" lang="und" style="--korpora-visible-cols: ${nCols}">
<thead class="korpora__thead"><tr>${ths.join("")}</tr></thead>
<tbody>
${bodyRows.join("\n")}
</tbody>
</table>`;

  return `<section class="korpora w-full" data-korpora-slug="texts/${slug}" data-korpora-cols="${colIds.join(",")}" aria-label="Corpus text">
  <div class="korpora__toolbar" role="toolbar" aria-label="Language columns">
  ${buttons.join("\n  ")}
  </div>
  <div class="korpora__scroll">
${tableHtml}
  </div>
</section>`;
}

export function getCorpusPostFields(
  data: ProcessedCorpusData,
  pageLangKey: string
): {
  title: string;
  description: string;
  keywords: string;
  author: string;
  priority: number;
  ogImage?: string;
} {
  const h = data.headers[pageLangKey] ?? data.headers["glico"];
  return {
    title: h.header,
    description: h.description,
    keywords: data.keywords,
    author: h.author,
    priority: h.priority,
    ogImage: data.ogImage,
  };
}

/** Lightweight metadata for listings (avoids full HTML build). */
export function getKorporaListingMeta(basename: string): {
  title: string;
  priority: number;
} | null {
  const data = loadProcessedCorpusFromTsv(basename);
  if (!data) return null;
  const h = data.headers["glico"];
  return { title: h?.header ?? basename, priority: h.priority };
}
