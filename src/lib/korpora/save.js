const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
 const browser = await chromium.launch();
 const context = await browser.newContext();
 const page = await context.newPage();
 await page.setViewportSize({ width: 1280, height: 2000 });

 const directoryPath = "/app/src/public/assets/pixra/ok/";
 const supportedExtensions = ['png', 'webp', 'jpg']; // Define supported extensions
 const files = fs.readdirSync(directoryPath);

 for (const ext of supportedExtensions) { // Iterate over each supported extension
    const extensionFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === `.${ext}`
    );

    for (const file of extensionFiles) { // Process each file of the current extension
      await page.goto("https://vectorizer.ai/");
      const filenameWithoutExtension = path.basename(file, path.extname(file));

      await page.setInputFiles(
        "#FileInput-Field",
        `${directoryPath}${filenameWithoutExtension}.${ext}`
      );

      await page.waitForSelector("#App-ImageView-RightCanvas", {timeout:60000});

      await page.waitForSelector("#App-Toolbar-Zoom1To1", {timeout:60000});

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
 }

 await browser.close();
})();
