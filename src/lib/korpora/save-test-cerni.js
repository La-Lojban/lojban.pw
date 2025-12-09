const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { getPublicAssetsPath } = require("../paths");

(async () => {
  // Ensure tmp directory exists and is writable
  const tmpPath = path.join(
    getPublicAssetsPath(),
    "pixra",
    "cilre-xekri-g-out"
  );
  if (!fs.existsSync(tmpPath)) {
    try {
      fs.mkdirSync(tmpPath, { recursive: true });
      console.log(`Created tmp directory: ${tmpPath}`);
    } catch (err) {
      console.warn(
        `Warning: Could not create tmp directory ${tmpPath}: ${err.message}`
      );
      tmpPath = require("os").tmpdir();
      console.log(`Using system tmp directory instead: ${tmpPath}`);
    }
  }

  const browser = await chromium.launch({ headless: false }); // Run in visible mode for debugging
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 2000 });

  const directoryPath = path.join(getPublicAssetsPath(), "pixra", "cilre-2");
  const filenameWithoutExtension = "cerni";
  const ext = "webp";

  try {
    console.log(`Processing ${filenameWithoutExtension}...`);

    // Navigate with increased timeout
    await page.goto("https://vectorizer.ai/", {
      waitUntil: "networkidle",
      timeout: 120000, // 2 minutes
    });

    await page.setInputFiles(
      "#FileInput-Field",
      path.join(directoryPath, `${filenameWithoutExtension}.${ext}`)
    );

    // Wait for processing to start - progress dialog should appear
    try {
      await page.waitForSelector("#App-Progress-Dialog", {
        state: "visible",
        timeout: 10000,
      });
      console.log("  Processing started...");
    } catch (err) {
      console.log("  Progress dialog didn't appear, continuing anyway...");
    }

    // Wait for processing to complete - progress dialog should disappear
    try {
      await page.waitForSelector("#App-Progress-Dialog", {
        state: "hidden",
        timeout: 120000, // 2 minutes for processing
      });
      console.log("  Processing completed");
    } catch (err) {
      console.log(
        "  Progress dialog didn't disappear within timeout, continuing..."
      );
    }

    // Wait for the canvas to be ready with proper dimensions (not 1x1)
    // The canvas exists from the start but has 1x1 dimensions until processing completes
    await page.waitForFunction(
      () => {
        const canvas = document.querySelector("#App-ImageView-RightCanvas");
        return canvas && canvas.width > 1 && canvas.height > 1;
      },
      { timeout: 120000 }
    );
    console.log("  Canvas ready with proper dimensions");

    await page.waitForSelector("#App-Toolbar-Zoom1To1", {
      timeout: 30000,
    });

    // Click the zoom 1:1 button before taking screenshot
    await page.evaluate(() => {
      const button = document.querySelector("#App-Toolbar-Zoom1To1");
      if (button) button.click();
    });

    // Give it a moment for the zoom to complete
    await page.waitForTimeout(2000);

    const dataURL = await page.evaluate(() => {
      const canvas = document.querySelector("#App-ImageView-RightCanvas");
      if (canvas) return canvas.toDataURL();
      return null;
    });

    if (dataURL) {
      const base64Data = dataURL.replace(/^data:image\/png;base64,/, "");
      const binaryData = Buffer.from(base64Data, "base64");

      // Use sharp to crop 100px from top and bottom
      const image = sharp(binaryData);
      const metadata = await image.metadata();

      console.log(`  Image dimensions: ${metadata.width}x${metadata.height}`);

      // Calculate new height (original height - 100px top - 100px bottom)
      const cropHeight = metadata.height - 200;

      if (cropHeight > 0) {
        const croppedImage = await image
          .extract({
            left: 0,
            top: 100,
            width: metadata.width,
            height: cropHeight,
          })
          .toBuffer();

        fs.writeFileSync(
          path.join(tmpPath, `${filenameWithoutExtension}.png`),
          croppedImage
        );
        console.log(
          `✓ saved ${filenameWithoutExtension} (cropped: ${metadata.width}x${cropHeight})`
        );
      } else {
        console.error(
          `✗ not saved ${filenameWithoutExtension} - image too small to crop (height: ${metadata.height})`
        );
      }
    } else {
      console.error(`✗ not saved ${filenameWithoutExtension} - no canvas data`);
    }
  } catch (error) {
    console.error(
      `✗ Error processing ${filenameWithoutExtension}:`,
      error.message
    );
  }

  await browser.close();
  console.log("Processing complete.");
})();
