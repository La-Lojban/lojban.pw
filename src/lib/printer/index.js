const puppeteer = require("playwright");
const fs = require("fs");
const { sluggify } = require("../html-prettifier/slugger");

(async function printPDF() {
	const urls = fs
		.readdirSync("/app/src/md_pages/books/")
		.filter((i) => i.endsWith(".md"))
		.map((i) => sluggify(i.replace(/.md$/, "")));

	console.log("generating PDF files for", urls);
	const browser = await puppeteer.chromium.launch({
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
			"/vreji/uencu/" + url.split("/").slice("-1")[0] + "-pre.pdf";
		fs.writeFileSync(pdfFile, pdf);
		console.log(`pdf file saved: ${pdfFile}`);
	}
	await browser.close();
})();
