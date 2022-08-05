const puppeteer = require("puppeteer");
const fs = require("fs");
const urls = ["/books/learn-lojban"];

(async function printPDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-dev-shm-usage",
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });
  const page = await browser.newPage();
  for (let url of urls) {
    url = "http://127.0.0.1:3000" + url.trim().replace(/\/+$/g,'');
    console.log(`opening page: ${url}`);
    await page.goto(url, {
      waitUntil: "networkidle0",
    });
    const pdf = await page.pdf({ format: "A4" });
    const pdfFile = "/app/src/public/vreji/uencu/" + url.split("/").slice("-1")[0] + "-pre.pdf";
    fs.writeFileSync(
      pdfFile,
      pdf
    );
    console.log(`pdf file saved: ${pdfFile}`);
  }
  await browser.close();
})();
