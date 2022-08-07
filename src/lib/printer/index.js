const puppeteer = require("puppeteer");
const fs = require("fs");

(async function printPDF() {
  const urls = fs
    .readdirSync("/app/src/md_pages/books/")
    .filter((i) => i.endsWith(".md"))
    .map((i) => i.replace(/.md$/, ""));

  console.log("generating PDF files for", urls);
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
    url = "http://127.0.0.1:3000/books/" + url;
    console.log(`opening page: ${url}`);
    await page.goto(url, {
      waitUntil: "networkidle0",
    });
    // let div_selector_to_remove = ".print:hidden";
    // await page.evaluate((sel) => {
    //   const elements = document.querySelectorAll(sel);
    //   for (let i = 0; i < elements.length; i++) {
    //     elements[i].parentNode.removeChild(elements[i]);
    //   }
    // }, div_selector_to_remove);
    const pdf = await page.pdf({
      format: "A4",
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    });
    const pdfFile =
      "/app/src/public/vreji/uencu/" +
      url.split("/").slice("-1")[0] +
      "-pre.pdf";
    fs.writeFileSync(pdfFile, pdf);
    console.log(`pdf file saved: ${pdfFile}`);
  }
  await browser.close();
})();
