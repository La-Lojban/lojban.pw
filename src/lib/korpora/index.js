const fs = require("fs");
const path = require("path");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const prettier = require("prettier");

if (!process.env.GOOGLE_LOJBAN_CORPUS_DOC_ID) {
  console.log(
    "generation cancelled, no GOOGLE_LOJBAN_CORPUS_DOC_ID in .env file specified"
  );
  process.exit();
}

const doc = new GoogleSpreadsheet(process.env.GOOGLE_LOJBAN_CORPUS_DOC_ID);
if (!process.env.GOOGLE_READONLY_API_KEY) {
  console.log(
    "generation cancelled, no GOOGLE_READONLY_API_KEY in .env file specified"
  );
  process.exit();
}
doc.useApiKey(process.env.GOOGLE_READONLY_API_KEY);

function cssifyName(text) {
  return text.replace(
    /[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~\s]/g,
    "_"
  );
}

(async () => {
  await doc.loadInfo();
  const titles = doc.sheetsByIndex
    .map((sheet) => sheet.title)
    .filter((name) => name.indexOf("+") === 0);
  const table = {};
  const buttons = {};
  const css = [];
  for (let title of titles) {
    const sheet = doc.sheetsByTitle[title];
    title = title.replace(/^\+/g, "").trim();
    const meta = await sheet.getRows();
    const langs = meta[0]._sheet.headerValues;
    // let extractedTitle = title;
    table[title] = [];
    buttons[title] = [];
    let columns = {};
    table[title]
      .push(`<table class="mt-2 table-fixed max-w-full border font-light dark:border-neutral-500 text-left text-sm">
    <thead class="border-b italic dark:border-neutral-500">`);
    table[title].push(`<tr>`);
    for (const i in langs) {
      const lang = langs[i];
      const l = cssifyName(lang);
      const txt = meta.map((row) => row[lang]);
      columns[lang] = txt;
      table[title].push(
        `<th scope="col" class="p-2 column-class-${l}">${lang}</th>`
      );
      buttons[title].push(
        `<input type="checkbox" id="hide-column-${l}" class="hide-column-checkbox-${l}" />
        <label for="hide-column-${l}" class="
        hide-column-button-${l}
        float-left
        ${i == 0 ? "rounded-l " : i == langs.length - 1 ? "rounded-r " : ""}
        drop-shadow
        bg-blue-500 hover:bg-blue-600 focus:bg-blue-600
        text-white font-bold
        uppercase leading-normal
        select-none
        py-2 px-4
        ">${lang}</label>`
      );
      css.push(
        ...`
      .hide-column-checkbox-${l} {
        display: none;
      }
    
      .hide-column-checkbox-${l}:checked + .hide-column-button-${l} ~ div table th.column-class-${l},
      .hide-column-checkbox-${l}:checked + .hide-column-button-${l} ~ div table td.column-class-${l} {
        display: none;
      }

      .hide-column-checkbox-${l}:checked + .hide-column-button-${l} {
        background-color: #fff;
        color: #007bff;
      }
      `
          .replace(/^ +/gim, "")
          .split(/\n{2,}/)
      );
    }
    table[title].push(`</tr>`);
    table[title].push(`</thead>`);
    table[title].push(`<tbody>`);
    for (const index in columns[langs[0]]) {
      table[title].push(
        `<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">`
      );
      for (const lang of langs) {
        const l = cssifyName(lang);
        table[title].push(
          `<td class="${
            index == 0 ? "font-bold " : ""
          }text-left align-text-top p-2 column-class-${l}">${
            columns[lang][index] ?? ""
          }</td>`
        );
      }
      table[title].push(`</tr>`);
    }
    table[title].push(`</tbody>`);
    table[title].push(`</table>`);
    const filepath = path.join("/app/src/md_pages/text", title + ".html");
    let contentMd = prettier.format(
      `   
    <div class="w-full">
    ${buttons[title].join("")}
    <div class="clear-both" />
${table[title].join("")}
</div>`,
      { filepath: filepath }
    );
    //     const content = `
    //     <!DOCTYPE html>
    // <html>
    // <title>${title}</title>
    // <head>
    // <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    // <link rel="stylesheet" href="style.css"/>
    // </head>
    // <body>
    // ${contentMd}
    // </body>
    // </html>
    //     `;
    contentMd = `---
title: "${title}"
meta.type: korpora
---

${contentMd}`;
    // fs.writeFileSync(filepath, prettier.format(content, { filepath }));
    const filepath_md = path.join("/app/src/md_pages/text", title + ".md");
    fs.writeFileSync(filepath_md, contentMd);
    console.log(`generated ${title} corpus entry`);
  }
  const csspath = path.join("/app/src/styles", "style.css");
  fs.writeFileSync(
    csspath,
    prettier.format(Array.from(new Set(css)).join("\n\n"), {
      filepath: csspath,
    })
  );
})();
