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
  //  let tmpPath = getTmpPath();
  if (!fs.existsSync(tmpPath)) {
    try {
      fs.mkdirSync(tmpPath, { recursive: true });
      console.log(`Created tmp directory: ${tmpPath}`);
    } catch (err) {
      console.warn(
        `Warning: Could not create tmp directory ${tmpPath}: ${err.message}`
      );
      // Fallback to system tmp
      tmpPath = require("os").tmpdir();
      console.log(`Using system tmp directory instead: ${tmpPath}`);
    }
  } else {
    // Check if writable
    try {
      fs.accessSync(tmpPath, fs.constants.W_OK);
    } catch (err) {
      console.warn(`Warning: tmp directory is not writable: ${tmpPath}`);
      // Fallback to system tmp
      tmpPath = require("os").tmpdir();
      console.log(`Using system tmp directory instead: ${tmpPath}`);
    }
  }

  console.log("Starting vectorizer processing...");
  console.log("Launching browser...");
  // Launch in non-headless mode to be closer to real user behavior and potentially avoid headless-specific restrictions
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Forward browser console logs to node process
  page.on("console", (msg) => console.log(`  BROWSER LOG: ${msg.text()}`));
  page.on("pageerror", (err) => console.log(`  BROWSER ERROR: ${err.message}`));
  page.on("requestfailed", (request) => {
    console.log(
      `  REQ FAILED: ${request.url()} - ${request.failure().errorText}`
    );
  });
  page.on("websocket", (ws) => {
    console.log(`  WS OPEN: ${ws.url()}`);
    ws.on("close", () => console.log(`  WS CLOSE: ${ws.url()}`));
    ws.on("socketerror", (err) =>
      console.log(`  WS ERROR: ${ws.url()} - ${err}`)
    );
  });

  await page.setViewportSize({ width: 1280, height: 2000 });
  console.log("Browser ready\n");

  const directoryPath = path.join(getPublicAssetsPath(), "pixra", "cilre-2");
  const supportedExtensions = ["png", "webp", "jpg"]; // Define supported extensions
  const files = fs.readdirSync(directoryPath);

  for (const ext of supportedExtensions) {
    // Iterate over each supported extension
    const extensionFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === `.${ext}`
    );

    for (const file of extensionFiles) {
      // Process each file of the current extension
      const filenameWithoutExtension = path.basename(file, path.extname(file));

      // Check if target file already exists
      const targetFilePath = path.join(
        tmpPath,
        `${filenameWithoutExtension}.png`
      );
      if (fs.existsSync(targetFilePath)) {
        console.log(
          `Skipping ${filenameWithoutExtension} - target file already exists`
        );
        continue;
      }

      try {
        const fullPath = path.join(
          directoryPath,
          `${filenameWithoutExtension}.${ext}`
        );
        console.log(`\nProcessing ${filenameWithoutExtension}.${ext}...`);
        console.log(`  File: ${fullPath}`);
        console.log(`  Navigating to vectorizer.ai...`);

        // Navigate with increased timeout
        await page.goto("https://vectorizer.ai/", {
          waitUntil: "networkidle",
          timeout: 120000, // 2 minutes
        });

        await page.setInputFiles(
          "#FileInput-Field",
          path.join(directoryPath, `${filenameWithoutExtension}.${ext}`)
        );
        console.log("  File input set, triggering change event...");

        // Trigger the change event to ensure the upload starts
        await page.evaluate(() => {
          const input = document.querySelector("#FileInput-Field");
          if (input) {
            const event = new Event("change", { bubbles: true });
            input.dispatchEvent(event);
          }
        });

        // Give the page a moment to react and start uploading
        await page.waitForTimeout(2000);

        // Poll and monitor the processing state
        console.log("  Monitoring processing state...");

        let lastProgressState = null;
        let lastCanvasWidth = null;
        let lastCanvasHeight = null;
        let lastProgressBars = { upload: null, process: null, fetch: null };
        let lastProgressLogTime = Date.now();
        let processingComplete = false;
        const startTime = Date.now();
        const maxWaitTime = 180000; // 3 minutes max
        const progressLogInterval = 10000; // Log progress every 10 seconds

        while (!processingComplete && Date.now() - startTime < maxWaitTime) {
          const state = await page.evaluate(() => {
            const progress = document.querySelector("#App-Progress-Dialog");
            const canvas = document.querySelector("#App-ImageView-RightCanvas");

            // Get progress bar widths
            const uploadBar = document.querySelector(
              "#App-Progress-Upload-Bar"
            );
            const processBar = document.querySelector(
              "#App-Progress-Process-Bar"
            );
            const fetchBar = document.querySelector(
              "#App-Progress-Download-Bar"
            );

            const getWidth = (el) => {
              if (!el) return null;
              const style = el.style.width;
              return style ? parseFloat(style) : 0;
            };

            return {
              progressExists: !!progress,
              progressVisible: progress
                ? window.getComputedStyle(progress).display !== "none"
                : false,
              canvasWidth: canvas ? canvas.width : 0,
              canvasHeight: canvas ? canvas.height : 0,
              progressBars: {
                upload: getWidth(uploadBar),
                process: getWidth(processBar),
                fetch: getWidth(fetchBar),
              },
            };
          });

          // Log progress dialog state changes
          if (state.progressVisible !== lastProgressState) {
            console.log(
              `  Progress dialog: ${state.progressVisible ? "VISIBLE" : "HIDDEN"}`
            );
            lastProgressState = state.progressVisible;
          }

          // Log canvas dimension changes
          if (
            state.canvasWidth !== lastCanvasWidth ||
            state.canvasHeight !== lastCanvasHeight
          ) {
            console.log(
              `  Canvas dimensions: ${state.canvasWidth}x${state.canvasHeight}`
            );
            lastCanvasWidth = state.canvasWidth;
            lastCanvasHeight = state.canvasHeight;
          }

          // Log progress bars when they change or every 10 seconds
          const now = Date.now();
          const progressChanged =
            state.progressBars.upload !== lastProgressBars.upload ||
            state.progressBars.process !== lastProgressBars.process ||
            state.progressBars.fetch !== lastProgressBars.fetch;

          if (
            state.progressVisible &&
            (progressChanged ||
              now - lastProgressLogTime >= progressLogInterval)
          ) {
            console.log(
              `  Progress: Upload ${state.progressBars.upload}% | Process ${state.progressBars.process}% | Fetch ${state.progressBars.fetch}%`
            );
            lastProgressBars = { ...state.progressBars };
            lastProgressLogTime = now;
          }

          // Check if processing is complete
          if (
            !state.progressVisible &&
            state.canvasWidth > 1 &&
            state.canvasHeight > 1
          ) {
            processingComplete = true;
            console.log("  ✓ Processing complete - canvas ready!");
            break;
          }

          // Wait a bit before next poll
          await page.waitForTimeout(500);
        }

        if (!processingComplete) {
          throw new Error(
            `Processing timeout after ${Math.round((Date.now() - startTime) / 1000)}s`
          );
        }

        await page.waitForSelector("#App-Toolbar-Zoom1To1", {
          timeout: 10000,
        });

        // Click the zoom 1:1 button before taking screenshot
        // Use JavaScript click to bypass any pointer event interception
        await page.evaluate(() => {
          const button = document.querySelector("#App-Toolbar-Zoom1To1");
          if (button) button.click();
        });

        // Give it a moment for the vectorization and zoom to complete
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

          // Calculate new height (original height - 100px top - 100px bottom)
          const cropHeight = metadata.height - 200;

          if (cropHeight > 0) {
            // Crop the image: skip 100px from top, take cropHeight pixels, then trim using top-left color
            const croppedImage = await image
              .extract({
                left: 0,
                top: 100,
                width: metadata.width,
                height: cropHeight,
              })
              // .trim({threshold: 0})
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
          console.error(
            `✗ not saved ${filenameWithoutExtension} - no canvas data`
          );
        }
      } catch (error) {
        console.error(
          `✗ Error processing ${filenameWithoutExtension}:`,
          error.message
        );
        // Continue with next file instead of crashing
        continue;
      }
    }
  }

  await browser.close();
  console.log("Processing complete.");
})();
