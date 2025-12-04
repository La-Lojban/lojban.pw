const playwright = require("playwright-core");
const fs = require("fs");
const path = require("path");
const { sluggify } = require("../html-prettifier/slugger");
const { languages } = require("../../config/locales.json");
const { getMdPagesPath, getVrejiPath } = require("../paths");

const allLanguages = Object.keys(languages);
const CONCURRENCY_LIMIT = 20; // Increased from 10 for faster PDF generation

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

    const vrejiPath = getVrejiPath();
    const pdfFile = path.join(vrejiPath, "uencu", shortLang, `${url.split("/").slice("-1")[0]}.pdf`);
    fs.mkdirSync(path.join(vrejiPath, "uencu", shortLang), { recursive: true });
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
  // Launch a single browser instance for all languages to reuse
  const browser = await playwright.chromium.launch({
    headless: true,
    args: [
      "--disable-dev-shm-usage",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu", // Faster in headless mode
      "--disable-software-rasterizer",
    ],
  });

  try {
    // Process all languages in parallel for faster builds
    await Promise.all(
      allLanguages.map(async (lang) => {
        const shortLang = languages[lang].short;
        const mdPagesPath = getMdPagesPath();
        const dirPath = path.join(mdPagesPath, shortLang, "books");

        if (!fs.existsSync(dirPath)) {
          return;
        }

        try {
          const urls = fs
            .readdirSync(dirPath)
            .filter((i) => i.endsWith(".md"))
            .map((i) => sluggify(i.replace(/.md$/, "")))
            .map((url) => `http://127.0.0.1:3000/${shortLang}/books/${url}`);

          console.log("generating PDF files for", urls);
          // Process URLs in batches with concurrency limit
          await processBatch(browser, urls, shortLang);
        } catch (err) {
          console.error(`Error processing language ${lang}:`, err);
        }
      })
    );
  } finally {
    await browser.close();
  }
}

printPDF().catch(console.error);
