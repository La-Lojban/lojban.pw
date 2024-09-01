const playwright = require("playwright-core");
const fs = require("fs");
const { sluggify } = require("../html-prettifier/slugger");
const { languages } = require("../../config/locales.json");

const allLanguages = Object.keys(languages);
const CONCURRENCY_LIMIT = 2;

async function generatePDF(browser, url, shortLang) {
  const page = await browser.newPage();
  try {
    console.log(`opening page: ${url}`);
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    const pdf = await page.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      quality: 100,
      format: "A4",
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
      timeout: 0,
    });

    const pdfFile = `/vreji/uencu/${shortLang}/${url.split("/").slice("-1")[0]}.pdf`;
    fs.mkdirSync(`/vreji/uencu/${shortLang}`, { recursive: true });
    fs.writeFileSync(pdfFile, pdf);
    console.log(`pdf file saved: ${pdfFile}`);
  } catch (error) {
    console.error(`Error generating PDF for ${url}:`, error);
  } finally {
    await page.close();
  }
}

async function processBatch(browser, urls, shortLang) {
  const results = [];
  for (let i = 0; i < urls.length; i += CONCURRENCY_LIMIT) {
    const batch = urls.slice(i, i + CONCURRENCY_LIMIT);
    const batchPromises = batch.map(url => generatePDF(browser, url, shortLang));
    results.push(...await Promise.all(batchPromises));
  }
  return results;
}

async function printPDF() {
  for (const lang of allLanguages) {
    const shortLang = languages[lang].short;
    try {
      const urls = fs
        .readdirSync(`/app/src/md_pages/${shortLang}/books/`)
        .filter((i) => i.endsWith(".md"))
        .map((i) => sluggify(i.replace(/.md$/, "")))
        .map((url) => `http://127.0.0.1:3000/${shortLang}/books/${url}`);

      console.log("generating PDF files for", urls);
      const browser = await playwright.chromium.launch({
        headless: true,
        args: [
          "--disable-dev-shm-usage",
          "--no-sandbox",
          "--disable-setuid-sandbox",
        ],
      });

      try {
        // Process URLs in batches with concurrency limit
        await processBatch(browser, urls, shortLang);
      } finally {
        await browser.close();
      }
    } catch (err) {
      console.error(`Error processing language ${lang}:`, err);
    }
  }
}

printPDF().catch(console.error);