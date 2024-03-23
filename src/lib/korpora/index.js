const fs = require("fs");
const path = require("path");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const prettier = require("prettier");
const { sluggify } = require("../html-prettifier/slugger");
const args = process.argv.slice(2);
const { autoSplitNTranslate } = require("./autotranslate");
const { languages } = require("../../config/locales.json");

const allLanguages = Object.keys(languages);

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

function moveElementForward(array, i) {
  return [array[i], ...array.slice(0, i), ...array.slice(i + 1)];
}

(async () => {
  await doc.loadInfo();
  const titles = doc.sheetsByIndex
    .map((sheet) => sheet.title)
    .filter((name) => name.indexOf("+") === 0);
  const table = {};
  const buttons = {};
  const headers = {};
  const css = [];
  for (let title of titles) {
    const sheet = doc.sheetsByTitle[title];
    title = title.replace(/^\+/g, "").trim();
    const meta = await sheet.getRows();
    const langs = meta[0]._sheet.headerValues.filter(
      (lang) => lang.indexOf("!") !== 0
    );
    table[title] = [];
    buttons[title] = [];
    let columns = {};
    table[title]
      .push(`<table class="mt-2 table-fixed max-w-full border font-light dark:border-neutral-500 text-left text-sm">
    <thead class="border-b italic dark:border-neutral-500">`);
    table[title].push(`<tr>`);
    for (const i in langs) {
      const lang = langs[i];
      const cssfiedLangName = cssifyName(lang);
      const txt = meta.map((row) => row[lang]);
      columns[lang] = txt;
      table[title].push(
        `<th scope="col" class="w-40 p-2 column-class-${cssfiedLangName}">${escapeHtml(lang)}</th>`
      );
      buttons[title].push(
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
        ">${languages[lang]?.native ?? lang}</label>`
      );
      css.push(
        ...`
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
      `
          .replace(/^ +/gim, "")
          .split(/\n{2,}/)
      );
    }
    table[title].push(`</tr>`);
    table[title].push(`</thead>`);
    table[title].push(`<tbody>`);

    const slug = sluggify(columns["glico"][1] ?? title);

    const priority = (columns["lojbo"] ?? []).slice(4).join("\n").length;
    allLanguages.forEach((lang) => {
      const header = columns[lang]?.[1] ?? columns["glico"]?.[1] ?? title;
      const author = columns[lang]?.[2] ?? columns["glico"]?.[2] ?? "";
      headers[lang] = {
        header,
        priority,
        author,
        description: `${header} - ${author}`.trim().replace(/ -$/, "").trim(),
      };
    });

    const keywords = Object.keys(columns)
      .map((lang) => columns[lang][1])
      .join(", ");
    let ogImage;
    for (const index in columns[langs[0]]) {
      const lineNo = parseInt(index) + 1;
      const candidate1 = `/app/src/public/assets/pixra/texts/${slug}/${lineNo}.svg`;
      const candidate1Exists = fs.existsSync(candidate1);
      const candidate2 = `/app/src/public/assets/pixra/texts/${slug}/${lineNo}.png`;
      const candidate2Exists = fs.existsSync(candidate2);
      const candidateExists = candidate1Exists || candidate2Exists;
      const candidatePath = (
        candidate1Exists ? candidate1 : candidate2Exists ? candidate2 : ""
      ).replace(/^\/app\/src\/public/, "");
      if (candidateExists) {
        ogImage = ogImage ?? candidatePath;
        table[title].push(
          `<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-100">
            <td colspan="${langs.length}">
            <div class="h-full w-full flex justify-center items-center">
            <img class="h-56" src="${candidatePath}"/>
            </div>
            </td>
          </tr>
          `
        );
      }
      table[title].push(
        `<tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-100">`
      );
      for (const lang of langs) {
        const l = cssifyName(lang);
        table[title].push(
          `<td class="${
            index == 0 ? "font-bold " : index < 4 ? "italic text-gray-500 " : ""
          }text-left align-text-top p-2 column-class-${l}">${escapeHtml(
            columns[lang][index] ?? ""
          )}</td>`
        );
      }
      table[title].push(`</tr>`);
    }
    table[title].push(`</tbody>`);
    table[title].push(`</table>`);
    for (const i in allLanguages) {
      const lang = allLanguages[i];
      const langedDirectoryRoot = `/app/src/md_pages/${languages[lang].short}`;
      const langedDirectory = `${langedDirectoryRoot}/texts`;
      const filepath = path.join(langedDirectory, title + ".html");

      const contentMd = await prettier.format(
        `   
    <div class="w-full">
    ${buttons[title].join("")}
    <div class="clear-both" />
    <div class="w-full overflow-x-auto">
${table[title].join("")}
</div>
</div>
`,
        { filepath: filepath }
      );
      const graymatter = [
        {
          key: "title",
          value: headers[lang].header ?? headers["glico"].header,
        },
        { key: "meta.type", value: "korpora" },
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
      if (!fs.existsSync(langedDirectoryRoot)) continue;
      // fs.rmSync(langedDirectory, { force: true, recursive: true });
      fs.mkdirSync(langedDirectory, { recursive: true });
      const filepath_md = path.join(langedDirectory, slug + ".md");
      fs.writeFileSync(filepath_md, contentFull);
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
      const translation_file = path.join("/tmp/korpora", slug + ".txt");
      fs.writeFileSync(translation_file, translation);
      console.log(`translated "${title}"`);
    }
  }
  const csspath = path.join("/app/src/styles", "style.css");
  fs.writeFileSync(
    csspath,
    await prettier.format(Array.from(new Set(css)).join("\n\n"), {
      filepath: csspath,
    })
  );
})();
