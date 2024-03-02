const puppeteer = require("playwright-core");
const fs = require("fs");
const { sluggify } = require("../html-prettifier/slugger");
const { languages } = require("../../config/locales.json");

const allLanguages = Object.keys(languages);

(async function printPDF() {
  let browser;
  for (const lang of allLanguages) {
    const shortLang = languages[lang].short;
    try {
      const urls = fs
        .readdirSync(`/app/src/md_pages/${shortLang}/books/`)
        .filter((i) => i.endsWith(".md"))
        .map((i) => sluggify(i.replace(/.md$/, "")));

      console.log("generating PDF files for", urls);
      browser = await puppeteer.chromium.launch({
        headless: true,
        args: [
          "--disable-dev-shm-usage",
          "--no-sandbox",
          "--disable-setuid-sandbox",
        ],
      });
      const page = await browser.newPage();
      for (let url of urls) {
        url = `http://127.0.0.1:3000/${shortLang}/books/` + url;
        console.log(`opening page: ${url}`);
        await page.goto(url, {
          waitUntil: "networkidle0",
          timeout: 0,
        });
        // await new Promise(resolve => setTimeout(resolve, 1500));
        // await page.screenshot();
        // await page.evaluateHandle('document.fonts.ready');

        // let div_selector_to_remove = ".print:hidden";
        // await page.evaluate((sel) => {
        //   const elements = document.querySelectorAll(sel);
        //   for (let i = 0; i < elements.length; i++) {
        //     elements[i].parentNode.removeChild(elements[i]);
        //   }
        // }, div_selector_to_remove);
        const pdf = await page.pdf({
          printBackground: true,
          format: "A4",
          margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
          timeout: 0,
        });
        const pdfFile =
          `/vreji/uencu/${shortLang}/` +
          url.split("/").slice("-1")[0] +
          "-pre.pdf";
        fs.mkdirSync(`/vreji/uencu/${shortLang}`, { recursive: true });
        fs.writeFileSync(pdfFile, pdf);
        console.log(`pdf file saved: ${pdfFile}`);
      }
    } catch (err) {
      continue;
    }
    try {
      await browser.close();
    } catch (error) {}
  }
})();
