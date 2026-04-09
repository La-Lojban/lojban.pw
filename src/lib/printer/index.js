const playwright = require("playwright-core");
const fs = require("fs");
const path = require("path");
const { sluggify } = require("../html-prettifier/slugger");
const { languages } = require("../../config/locales.json");
const { getMdPagesPath, getVrejiPath } = require("../paths");

const allLanguages = Object.keys(languages);

function ts() {
  return new Date().toISOString();
}

function log(...args) {
  console.log(`[${ts()}]`, ...args);
}

// Single global queue caps total in-flight PDFs (all locales). Override in CI with PDF_PRINT_CONCURRENCY.
const CONCURRENCY_LIMIT = (() => {
  const raw = process.env.PDF_PRINT_CONCURRENCY;
  const n = raw ? parseInt(raw, 10) : 20;
  return Number.isFinite(n) && n > 0 ? n : 20;
})();

const PAGE_TIMEOUT = 300000; // 5 minutes timeout for page operations (large books need time)
const PDF_GENERATION_TIMEOUT = 600000; // 10 minutes timeout for PDF generation

/** Run async work over items with at most `concurrency` in flight (global pool). */
async function mapPool(items, concurrency, fn) {
  let i = 0;
  const out = new Array(items.length);
  async function worker() {
    while (true) {
      const j = i++;
      if (j >= items.length) return;
      out[j] = await fn(items[j], j);
    }
  }
  const n = Math.min(concurrency, Math.max(1, items.length));
  await Promise.all(Array.from({ length: n }, () => worker()));
  return out;
}

async function generatePDF(browser, url, shortLang, meta) {
  const page = await browser.newPage();
  try {
    const label = meta ? ` (${meta.index + 1}/${meta.total})` : "";
    log(`opening page${label}: ${url}`);
    
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
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate:
        '<div style="width:100%;font-size:9px;color:#4b5563;text-align:center;font-family:system-ui,Segoe UI,sans-serif;">Page <span class="pageNumber"></span></div>',
      margin: { top: "12mm", right: "12mm", bottom: "18mm", left: "12mm" },
      timeout: PDF_GENERATION_TIMEOUT,
    });

    const vrejiPath = getVrejiPath();
    const pdfFile = path.join(
      vrejiPath,
      "uencu",
      shortLang,
      `${url.split("/").slice(-1)[0]}.pdf`,
    );
    // Dir already created at start of printPDF(); ensure it exists for this locale
    fs.mkdirSync(path.join(vrejiPath, "uencu", shortLang), { recursive: true });

    // Use synchronous write with explicit error handling
    try {
      fs.writeFileSync(pdfFile, pdf);
    } catch (writeErr) {
      if (writeErr.code === "EACCES") {
        const hint = "If this dir or file was created by root/Docker, run: chown -R $(whoami):$(whoami) " + path.join(vrejiPath, "uencu");
        throw new Error(`${writeErr.message}. ${hint}`);
      }
      throw writeErr;
    }
    log(`pdf file saved: ${pdfFile}`);
    
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

async function generatePDFWithTimeout(browser, url, shortLang, meta) {
  return Promise.race([
    generatePDF(browser, url, shortLang, meta),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error(`Timeout after ${PDF_GENERATION_TIMEOUT}ms`)), PDF_GENERATION_TIMEOUT + 10000)
    )
  ]).catch(error => {
    console.error(`Failed to generate PDF for ${url}:`, error);
    return { success: false, url, error: error.message };
  });
}

async function printPDF() {
  // Create all locale output dirs upfront so they are owned by the current user.
  // (Avoids EACCES when dirs or files were left from a previous root/Docker run.)
  const vrejiPath = getVrejiPath();
  const uencuBase = path.join(vrejiPath, "uencu");
  fs.mkdirSync(uencuBase, { recursive: true });
  for (const lang of allLanguages) {
    const shortLang = languages[lang].short;
    fs.mkdirSync(path.join(uencuBase, shortLang), { recursive: true });
  }

  // Launch a single browser instance for all languages to reuse
  const browser = await playwright.chromium.launch({
    // In CI, PLAYWRIGHT_BROWSERS_PATH is set and playwright finds its own browser there.
    // Locally (no downloaded browsers), fall back to the system Chrome.
    ...(process.env.PLAYWRIGHT_BROWSERS_PATH
      ? {}
      : { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ?? "/usr/bin/google-chrome" }),
    headless: true,
    args: [
      "--disable-dev-shm-usage",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-software-rasterizer",
    ],
  });

  try {
    const mdPagesPath = getMdPagesPath();
    const jobs = [];

    for (const lang of allLanguages) {
      const shortLang = languages[lang].short;
      const dirPath = path.join(mdPagesPath, shortLang, "books");

      if (!fs.existsSync(dirPath)) {
        continue;
      }

      try {
        const urls = fs
          .readdirSync(dirPath)
          .filter((i) => i.endsWith(".md"))
          .map((i) => sluggify(i.replace(/.md$/, "")))
          .map(
            (slug) =>
              `http://127.0.0.1:3000/${shortLang}/books/${slug}`,
          );

        for (const url of urls) {
          jobs.push({ url, shortLang, lang });
        }
      } catch (err) {
        console.error(`[${ts()}] Error scanning language ${lang}:`, err);
      }
    }

    const total = jobs.length;
    log(
      `PDF queue: ${total} jobs, concurrency=${CONCURRENCY_LIMIT}` +
        (process.env.PDF_PRINT_CONCURRENCY ? " (from PDF_PRINT_CONCURRENCY)" : ""),
    );
    const started = Date.now();

    const allResults = await mapPool(jobs, CONCURRENCY_LIMIT, (job, index) =>
      generatePDFWithTimeout(browser, job.url, job.shortLang, {
        index,
        total,
      }),
    );

    log(`PDF queue finished in ${((Date.now() - started) / 1000).toFixed(1)}s`);
    const successful = allResults.filter(r => r && r.success).length;
    const failed = allResults.filter(r => r && !r.success).length;
    log(`PDF generation complete: ${successful} successful, ${failed} failed`);

    if (failed > 0) {
      console.error(`[${ts()}] Some PDFs failed to generate. Check logs above for details.`);
      process.exitCode = 1;
    }
  } finally {
    // Ensure browser is properly closed
    log("Closing browser...");
    await browser.close();
    log("Browser closed successfully");
  }
}

printPDF()
  .then(() => {
    log("PDF generation script completed");
    // Give Node.js time to flush stdout/stderr before exiting
    setTimeout(() => {
      process.exit(process.exitCode || 0);
    }, 100);
  })
  .catch((error) => {
    console.error("Fatal error in PDF generation:", error);
    process.exit(1);
  });
