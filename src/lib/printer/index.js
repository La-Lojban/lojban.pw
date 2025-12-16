const playwright = require("playwright-core");
const fs = require("fs");
const path = require("path");
const { sluggify } = require("../html-prettifier/slugger");
const { languages } = require("../../config/locales.json");
const { getMdPagesPath, getVrejiPath } = require("../paths");

const allLanguages = Object.keys(languages);
const CONCURRENCY_LIMIT = 20; // Increased from 10 for faster PDF generation
const PAGE_TIMEOUT = 300000; // 5 minutes timeout for page operations (large books need time)
const PDF_GENERATION_TIMEOUT = 600000; // 10 minutes timeout for PDF generation

async function generatePDF(browser, url, shortLang) {
  const page = await browser.newPage();
  try {
    console.log(`opening page: ${url}`);
    
    // Set page timeout
    page.setDefaultTimeout(PAGE_TIMEOUT);
    
    await page.goto(url, {
      waitUntil: "load", // Changed from "networkidle" - just wait for page load, not all network activity
      timeout: PAGE_TIMEOUT,
    });
    
    // Give the page a bit more time to settle after load
    await page.waitForTimeout(2000);

    const pdf = await page.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      quality: 100,
      format: "A4",
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
      timeout: PDF_GENERATION_TIMEOUT,
    });

    const vrejiPath = getVrejiPath();
    const pdfFile = path.join(vrejiPath, "uencu", shortLang, `${url.split("/").slice("-1")[0]}.pdf`);
    fs.mkdirSync(path.join(vrejiPath, "uencu", shortLang), { recursive: true });
    
    // Use synchronous write with explicit error handling
    fs.writeFileSync(pdfFile, pdf);
    console.log(`pdf file saved: ${pdfFile}`);
    
    return { success: true, url, pdfFile };
  } catch (error) {
    console.error(`Error generating PDF for ${url}:`, error);
    return { success: false, url, error: error.message };
  } finally {
    // Ensure page is closed even if there's an error
    try {
    await page.close();
    } catch (closeError) {
      console.error(`Error closing page for ${url}:`, closeError);
    }
  }
}

async function generatePDFWithTimeout(browser, url, shortLang) {
  return Promise.race([
    generatePDF(browser, url, shortLang),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error(`Timeout after ${PDF_GENERATION_TIMEOUT}ms`)), PDF_GENERATION_TIMEOUT + 10000)
    )
  ]).catch(error => {
    console.error(`Failed to generate PDF for ${url}:`, error);
    return { success: false, url, error: error.message };
  });
}

async function processBatch(browser, urls, shortLang) {
  const results = [];
  for (let i = 0; i < urls.length; i += CONCURRENCY_LIMIT) {
    const batch = urls.slice(i, i + CONCURRENCY_LIMIT);
    console.log(`Processing batch ${Math.floor(i / CONCURRENCY_LIMIT) + 1} of ${Math.ceil(urls.length / CONCURRENCY_LIMIT)} (${batch.length} PDFs)`);
    const batchPromises = batch.map(url => generatePDFWithTimeout(browser, url, shortLang));
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
    const results = await Promise.all(
      allLanguages.map(async (lang) => {
        const shortLang = languages[lang].short;
        const mdPagesPath = getMdPagesPath();
        const dirPath = path.join(mdPagesPath, shortLang, "books");

        if (!fs.existsSync(dirPath)) {
          return [];
        }

        try {
          const urls = fs
            .readdirSync(dirPath)
            .filter((i) => i.endsWith(".md"))
            .map((i) => sluggify(i.replace(/.md$/, "")))
            .map((url) => `http://127.0.0.1:3000/${shortLang}/books/${url}`);

          console.log("generating PDF files for", urls);
          // Process URLs in batches with concurrency limit
          return await processBatch(browser, urls, shortLang);
        } catch (err) {
          console.error(`Error processing language ${lang}:`, err);
          return [];
        }
      })
    );

    // Log summary of results
    const allResults = results.flat();
    const successful = allResults.filter(r => r && r.success).length;
    const failed = allResults.filter(r => r && !r.success).length;
    console.log(`PDF generation complete: ${successful} successful, ${failed} failed`);

    if (failed > 0) {
      console.error("Some PDFs failed to generate. Check logs above for details.");
      process.exitCode = 1;
    }
  } finally {
    // Ensure browser is properly closed
    console.log("Closing browser...");
    await browser.close();
    console.log("Browser closed successfully");
  }
}

printPDF()
  .then(() => {
    console.log("PDF generation script completed");
    // Give Node.js time to flush stdout/stderr before exiting
    setTimeout(() => {
      process.exit(process.exitCode || 0);
    }, 100);
  })
  .catch((error) => {
    console.error("Fatal error in PDF generation:", error);
    process.exit(1);
  });
