const fs = require("fs");
const path = require("path");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const prettier = require("prettier");
const { sluggify } = require("../html-prettifier/slugger");
const { languages } = require("../../config/locales.json");
const { getMdPagesPath, getPublicAssetsPath, getStylesPath, getTmpPath } = require("../paths");

const allLanguages = Object.keys(languages);
const MAX_CONCURRENT_TASKS = 20;
const TSV_FOLDER_NAME = "korpora-tsv";
const tsvOutputDir = path.join(getPublicAssetsPath(), TSV_FOLDER_NAME);
const tsvIndexFilename = "korpora-tsv.md";

function parseTableCell(cellContent) {
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

if (!process.env.GOOGLE_LOJBAN_CORPUS_DOC_ID) {
  console.log(
    "generation cancelled, no GOOGLE_LOJBAN_CORPUS_DOC_ID in .env file specified"
  );
  process.exit();
}

if (!process.env.GOOGLE_READONLY_API_KEY) {
  console.log(
    "generation cancelled, no GOOGLE_READONLY_API_KEY in .env file specified"
  );
  process.exit();
}

const doc = new GoogleSpreadsheet(process.env.GOOGLE_LOJBAN_CORPUS_DOC_ID);
doc.useApiKey(process.env.GOOGLE_READONLY_API_KEY);

function prettifyGraymatter(str) {
  return str
    .replace(/[\r\n]/g, " ")
    .replace(/ {2,}/g, " ")
    .replace(/:/g, "");
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function sanitizeTsvValue(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\t/g, " ").replace(/\r?\n/g, " ").trim();
}

function shouldIncludeInTsv(header) {
  const lower = (header ?? "").toLowerCase();
  return (
    lower.includes("glico") ||
    lower.includes("lojbo") ||
    lower.includes("original") ||
    lower.includes("source")
  );
}

function buildTsvContent(columns, langs) {
  if (!langs?.length) return "";

  const selectedHeaders = [];
  langs.forEach((header, index) => {
    if (index === 0 || shouldIncludeInTsv(header)) {
      if (!selectedHeaders.includes(header)) selectedHeaders.push(header);
    }
  });

  if (!selectedHeaders.length) return "";

  const rowCount = columns[selectedHeaders[0]]?.length ?? 0;
  const lines = [];
  lines.push(selectedHeaders.map((h) => sanitizeTsvValue(h)).join("\t"));

  for (let i = 0; i < rowCount; i++) {
    const row = selectedHeaders.map((header) => sanitizeTsvValue(columns[header]?.[i]));
    lines.push(row.join("\t"));
  }

  return lines.join("\n");
}

function writeTsvFile(slug, tsvContent) {
  if (!tsvContent) return;
  fs.mkdirSync(tsvOutputDir, { recursive: true });
  const tsvPath = path.join(tsvOutputDir, `${slug}.tsv`);
  fs.writeFileSync(tsvPath, tsvContent);
}

function writeTsvIndexFile() {
  const mdPagesPath = getMdPagesPath();
  if (!fs.existsSync(mdPagesPath)) return;

  const tsvFiles = fs
    .readdirSync(tsvOutputDir, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".tsv"))
    .map((dirent) => dirent.name)
    .sort();

  const listBody =
    tsvFiles.length === 0
      ? "_No TSV files generated._"
      : tsvFiles
        .map((file) => {
          const title = path.parse(file).name;
          return `- [${title}](/assets/${TSV_FOLDER_NAME}/${file})`;
        })
        .join("\n");

  const content = `---
title: Korpora TSV Index
meta.type: korpora
---

Below is the list of generated TSV extracts from the corpus sheets:

${listBody}
`;

  const targetPath = path.join(mdPagesPath, tsvIndexFilename);
  const formatted = prettier.format(content, { filepath: targetPath });
  fs.writeFileSync(targetPath, formatted);
}

function cssifyName(text) {
  return text.replace(
    /[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~\s]/g,
    "_"
  );
}

async function processSheet(sheet, title) {
  const meta = await sheet.getRows();
  await sheet.loadCells();
  const italicizedRows = [];
  for (let i = 0; i < sheet.rowCount; i++) {
    const cell = sheet.getCell(i, 0);
    if (cell?.effectiveFormat?.textFormat?.italic) italicizedRows.push(i);
  }

  let langs = meta[0]._sheet.headerValues.filter(
    (lang) => lang.indexOf("!") !== 0
  );
  let table = [];
  let buttons = [];
  let columns = {};
  table.push(`<table class="mt-2 table-fixed max-w-full border font-light text-left text-sm">
    <thead class="border-b italic">`);
  table.push(`<tr>`);

  const columnsWithTables = {};

  for (const i in langs) {
    const lang = langs[i];
    const cssfiedLangName = cssifyName(lang);
    const txt = meta.map((row) => row[lang]);
    columns[lang] = txt;

    if (lang && lang.includes("||")) {
      columnsWithTables[lang] = true;
    }

    const prettifiedLang = lang.replace(/\|\|/g, "").trim();
    table.push(
      lang && lang.includes("||")
        ? `<th scope="col" class="w-40 p-2 column-class-${cssfiedLangName}">${escapeHtml(prettifiedLang)}</th>`
        : `<th scope="col" class="w-40 p-2 column-class-${cssfiedLangName}">${escapeHtml(prettifiedLang)}</th>`
    );
    buttons.push(
      `<input type="checkbox" id="hide-column-${cssfiedLangName}" class="hide-column-checkbox-${cssfiedLangName}" />
      <label for="hide-column-${cssfiedLangName}" class="
      hide-column-button-${cssfiedLangName}
      float-left
      drop-shadow
      bg-teal-100 hover:bg-teal-600 focus:bg-teal-600
      text-gray-900 hover:text-white
      font-bold
      leading-normal
      select-none
      py-2 px-4
      ">${languages[lang]?.native ?? languages[prettifiedLang]?.native ?? prettifiedLang}</label>`
    );
  }
  table.push(`</tr>`);
  table.push(`</thead>`);
  table.push(`<tbody>`);

  const slug = sluggify(columns["glico"][1] ?? title);

  const priority = (columns["lojbo"] ?? []).slice(4).join("\n").length;
  const headers = {};
  allLanguages.forEach((lang) => {
    const header = prettifyGraymatter(
      columns[lang]?.[1] ?? columns["glico"]?.[1] ?? title
    );
    console.log({ header, lang });
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
    .map((lang) => columns[lang][1])
    .filter((column) => !!column)
    .join(", ");
  let ogImage;
  const tsvContent = buildTsvContent(columns, langs);

  for (const index in columns[langs[0]]) {
    const lineNo = parseInt(index) + 1;
    const publicAssetsPath = getPublicAssetsPath();
    // Priority: svg > png > webp
    const imageExtensions = ["svg", "png", "webp"];
    let candidatePath = "";
    for (const ext of imageExtensions) {
      const candidate = path.join(publicAssetsPath, "pixra", "texts", slug, `${lineNo}.${ext}`);
      if (fs.existsSync(candidate)) {
        candidatePath = path.join("/assets", "pixra", "texts", slug, `${lineNo}.${ext}`);
        break;
      }
    }
    if (candidatePath) {
      ogImage = ogImage ?? candidatePath;
      table.push(
        `<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">
          <td colspan="${langs.length}">
          <div class="h-full w-full flex justify-center items-center">
          <img class="h-56" src="${candidatePath}"/>
          </div>
          </td>
        </tr>
        `
      );
    }
    table.push(
      `<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100">`
    );
    for (const lang of langs) {
      const l = cssifyName(lang);

      let cellContent = columns[lang][index] ?? "";

      if (columnsWithTables[lang] && cellContent.includes("|")) {
        cellContent = parseTableCell(cellContent);
      } else {
        cellContent = escapeHtml(cellContent);
      }

      table.push(
        `<td class="${index == 0
          ? "font-bold "
          : index < 4 || italicizedRows.includes(parseInt(index) + 1)
            ? "italic text-gray-500 "
            : ""
        }${languages[lang]?.direction === "RTL" ? "text-right" : "text-left"} align-text-top p-2 column-class-${l}">${cellContent}</td>`
      );
    }
    table.push(`</tr>`);
  }
  table.push(`</tbody>`);
  table.push(`</table>`);

  return { table, buttons, headers, slug, keywords, ogImage, columns, tsvContent };
}

async function writeFiles(
  lang,
  title,
  buttons,
  table,
  headers,
  slug,
  keywords,
  ogImage
) {
  const mdPagesPath = getMdPagesPath();
  const langedDirectoryRoot = path.join(mdPagesPath, languages[lang].short);
  const langedDirectory = path.join(langedDirectoryRoot, "texts");
  const filepath = path.join(langedDirectory, title + ".html");

  const contentMd = await prettier.format(
    `   
  <div class="w-full">
  ${buttons.join("")}
  <div class="clear-both" />
  <div class="w-full overflow-x-auto">
${table.join("")}
</div>
</div>
`,
    { filepath: filepath }
  );

  const graymatter = [
    { key: "title", value: headers[lang].header ?? headers["glico"].header },
    { key: "meta.type", value: "korpora" },
    {
      key: "description",
      value: headers[lang].description ?? headers["glico"].description,
    },
    {
      key: "meta.description",
      value: headers[lang].description ?? headers["glico"].description,
    },
    { key: "meta.keywords", value: keywords },
    {
      key: "meta.author",
      value: headers[lang].author ?? headers["glico"].author,
    },
    { key: "og:image", value: ogImage },
    {
      key: "meta.priority",
      value: headers[lang].priority ?? headers["glico"].priority,
    },
  ].filter((el) => el.value !== undefined);

  const contentFull = `---
${graymatter.map(({ key, value }) => `${key}: ${value}`).join("\n")}
---

${contentMd}`;

  if (!fs.existsSync(langedDirectoryRoot)) return;
  fs.mkdirSync(langedDirectory, { recursive: true });
  const filepath_md = path.join(langedDirectory, slug + ".md");
  fs.writeFileSync(filepath_md, contentFull);
}

async function processTitlesInParallel(titles, processFunction) {
  const results = [];
  for (let i = 0; i < titles.length; i += MAX_CONCURRENT_TASKS) {
    const batch = titles.slice(i, i + MAX_CONCURRENT_TASKS);
    const batchResults = await Promise.all(batch.map(processFunction));
    results.push(...batchResults);
  }
  return results;
}

(async () => {
  await doc.loadInfo();
  const titles = doc.sheetsByIndex
    .map((sheet) => sheet.title)
    .filter((name) => name.indexOf("+") === 0);

  fs.mkdirSync(getPublicAssetsPath(), { recursive: true });
  fs.rmSync(tsvOutputDir, { recursive: true, force: true });
  fs.mkdirSync(tsvOutputDir, { recursive: true });

  const processedData = await processTitlesInParallel(titles, async (title) => {
    const sheet = doc.sheetsByTitle[title];
    title = title.replace(/^\+/g, "").trim();
    return { title, data: await processSheet(sheet, title) };
  });

  const css = [];

  console.log("generating korpora pages");
  await processTitlesInParallel(processedData, async ({ title, data }) => {
    const { table, buttons, headers, slug, keywords, ogImage, columns, tsvContent } = data;

    writeTsvFile(slug, tsvContent);

    // Parallelize language processing for faster builds
    await Promise.all(
      allLanguages.map(lang =>
        writeFiles(
          lang,
          title,
          buttons,
          table,
          headers,
          slug,
          keywords,
          ogImage
        )
      )
    );

    console.log(`generated "${title}" corpus entry`);

    // Generate CSS
    for (const lang of Object.keys(columns)) {
      const cssfiedLangName = cssifyName(lang);
      css.push(`
        .hide-column-checkbox-${cssfiedLangName} {
          display: none;
        }
      
        .hide-column-checkbox-${cssfiedLangName}:checked + .hide-column-button-${cssfiedLangName} ~ div table th.column-class-${cssfiedLangName},
        .hide-column-checkbox-${cssfiedLangName}:checked + .hide-column-button-${cssfiedLangName} ~ div table td.column-class-${cssfiedLangName} {
          display: none;
        }

        .hide-column-checkbox-${cssfiedLangName}:checked + .hide-column-button-${cssfiedLangName} {
          background-color: #fff;
          color: #999;
        }

        .column-class-${cssfiedLangName} {
          min-width: 200px;
          ${lang && lang.includes("||") ? "white-space: nowrap; overflow-x: auto;" : "max-width: 400px;"}
        }
      `);
    }
  });

  css.push(`
    .inner-table {
      table-layout: fixed;
      width: 100%;
    }
    .inner-table td {
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    tr td .inner-table {
      table-layout: auto;
      width: auto;
    }
    tr td .inner-table td {
      white-space: nowrap;
    }
  `);

  const stylesPath = getStylesPath();
  const csspath = path.join(stylesPath, "style.css");
  fs.writeFileSync(
    csspath,
    await prettier.format(Array.from(new Set(css)).join("\n\n"), {
      filepath: csspath,
    })
  );

  writeTsvIndexFile();
})();
