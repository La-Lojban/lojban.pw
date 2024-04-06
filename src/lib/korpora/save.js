const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 2000 });

  const directoryPath = "/app/src/public/assets/pixra/cilre/";

  const files = fs.readdirSync(directoryPath);

  const webpFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".webp"
  );

  for (const file of webpFiles) {
    await page.goto("https://vectorizer.ai/");
    const filenameWithoutExtension = path.basename(file, path.extname(file));

    await page.setInputFiles(
      "#FileInput-Field",
      `${directoryPath}${filenameWithoutExtension}.webp`
    );

    await page.waitForSelector("#App-ImageView-RightCanvas");

    await page.waitForSelector("#App-Toolbar-Zoom1To1");

    const dataURL = await page.evaluate(() => {
      const canvas = document.querySelector("#App-ImageView-RightCanvas");
      if (canvas) return canvas.toDataURL();

      return null;
    });

    if (dataURL) {
      const base64Data = dataURL.replace(/^data:image\/png;base64,/, "");

      const binaryData = Buffer.from(base64Data, "base64");

      fs.writeFileSync(`/tmp/${filenameWithoutExtension}.png`, binaryData);
      console.log(`saved ${filenameWithoutExtension}`);
    } else {
      console.error(`!!! not saved ${filenameWithoutExtension}`);
    }
  }

  await browser.close();
})();
