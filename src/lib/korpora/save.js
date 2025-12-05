const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { getPublicAssetsPath, getTmpPath } = require("../paths");

(async () => {
 // Ensure tmp directory exists and is writable
 let tmpPath = getTmpPath();
 if (!fs.existsSync(tmpPath)) {
   try {
     fs.mkdirSync(tmpPath, { recursive: true });
     console.log(`Created tmp directory: ${tmpPath}`);
   } catch (err) {
     console.warn(`Warning: Could not create tmp directory ${tmpPath}: ${err.message}`);
     // Fallback to system tmp
     tmpPath = require('os').tmpdir();
     console.log(`Using system tmp directory instead: ${tmpPath}`);
   }
 } else {
   // Check if writable
   try {
     fs.accessSync(tmpPath, fs.constants.W_OK);
   } catch (err) {
     console.warn(`Warning: tmp directory is not writable: ${tmpPath}`);
     // Fallback to system tmp
     tmpPath = require('os').tmpdir();
     console.log(`Using system tmp directory instead: ${tmpPath}`);
   }
 }

 const browser = await chromium.launch();
 const context = await browser.newContext();
 const page = await context.newPage();
 await page.setViewportSize({ width: 1280, height: 2000 });

 const directoryPath = path.join(getPublicAssetsPath(), "pixra", "ok");
 const supportedExtensions = ['png', 'webp', 'jpg']; // Define supported extensions
 const files = fs.readdirSync(directoryPath);

 for (const ext of supportedExtensions) { // Iterate over each supported extension
    const extensionFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === `.${ext}`
    );

    for (const file of extensionFiles) { // Process each file of the current extension
      const filenameWithoutExtension = path.basename(file, path.extname(file));
      
      try {
        console.log(`Processing ${filenameWithoutExtension}...`);
        
        // Navigate with increased timeout
        await page.goto("https://vectorizer.ai/", {
          waitUntil: "networkidle",
          timeout: 120000 // 2 minutes
        });

        await page.setInputFiles(
          "#FileInput-Field",
          path.join(directoryPath, `${filenameWithoutExtension}.${ext}`)
        );

        // Wait for the canvas container and toolbar to be ready
        await page.waitForSelector("#App-ImageView-CanvasContainer canvas", {timeout:60000});

        await page.waitForSelector("#App-Toolbar-Zoom1To1", {timeout:60000});
        
        // Give it a moment for the vectorization to complete
        await page.waitForTimeout(2000);

        const dataURL = await page.evaluate(() => {
          // Find the canvas inside the canvas container
          const canvas = document.querySelector("#App-ImageView-CanvasContainer canvas");
          if (canvas) return canvas.toDataURL();

          return null;
        });

        if (dataURL) {
          const base64Data = dataURL.replace(/^data:image\/png;base64,/, "");

          const binaryData = Buffer.from(base64Data, "base64");

          fs.writeFileSync(path.join(tmpPath, `${filenameWithoutExtension}.png`), binaryData);
          console.log(`✓ saved ${filenameWithoutExtension}`);
        } else {
          console.error(`✗ not saved ${filenameWithoutExtension} - no canvas data`);
        }
      } catch (error) {
        console.error(`✗ Error processing ${filenameWithoutExtension}:`, error.message);
        // Continue with next file instead of crashing
        continue;
      }
    }
 }

 await browser.close();
 console.log("Processing complete.");
})();
