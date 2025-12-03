const fs = require("fs");
const path = require("path");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const prettier = require("prettier");
const { sluggify } = require("../html-prettifier/slugger");
const args = process.argv.slice(2);
const { autoSplitNTranslate } = require("./autotranslate");
const { languages } = require("../../config/locales.json");
const { getMdPagesPath, getPublicAssetsPath, getStylesPath, getTmpPath } = require("../paths");

const allLanguages = Object.keys(languages);
const MAX_CONCURRENT_TASKS = 20;

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
    console.log({header, lang});
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

  for (const index in columns[langs[0]]) {
    const lineNo = parseInt(index) + 1;
    const publicAssetsPath = getPublicAssetsPath();
    const candidate1 = path.join(publicAssetsPath, "pixra", "texts", slug, `${lineNo}.svg`);
    const candidate2 = path.join(publicAssetsPath, "pixra", "texts", slug, `${lineNo}.png`);
    const candidate1Exists = fs.existsSync(candidate1);
    const candidate2Exists = fs.existsSync(candidate2);
    const candidateExists = candidate1Exists || candidate2Exists;
    // For web paths, we need relative path from public directory
    const candidatePath = candidateExists
      ? path.join("/assets", "pixra", "texts", slug, candidate1Exists ? `${lineNo}.svg` : `${lineNo}.png`)
      : "";
    if (candidateExists) {
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
        `<td class="${
          index == 0
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

  return { table, buttons, headers, slug, keywords, ogImage, columns };
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

  const processedData = await processTitlesInParallel(titles, async (title) => {
    const sheet = doc.sheetsByTitle[title];
    title = title.replace(/^\+/g, "").trim();
    return { title, data: await processSheet(sheet, title) };
  });

  const css = [];

  console.log("generating korpora pages");
  await processTitlesInParallel(processedData, async ({ title, data }) => {
    const { table, buttons, headers, slug, keywords, ogImage, columns } = data;

    for (const lang of allLanguages) {
      await writeFiles(
        lang,
        title,
        buttons,
        table,
        headers,
        slug,
        keywords,
        ogImage
      );
    }

    console.log(`generated "${title}" corpus entry`);

    if ((args[0] ?? "").indexOf("fanva") === 0) {
      const translation = await autoSplitNTranslate({
        title,
        chunkSize: 8,
        text: columns["glico"],
        from: "en",
        to: args[0].replace(/^fanva-/, ""),
        limit: 3000,
      });
      const tmpPath = getTmpPath();
      const translation_file = path.join(tmpPath, "korpora", slug + ".txt");
      fs.mkdirSync(path.join(tmpPath, "korpora"), { recursive: true });
      fs.writeFileSync(translation_file, translation);
      console.log(`translated "${title}"`);
    }

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
})();
