const puppeteer = require("playwright-core");
// const fs = require("fs");

let browser;

async function translateText({ text, from, to }) {
  if (!browser) {
    browser = await puppeteer.chromium.launch({
      headless: true,
      args: [
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });
  }
  const targetDummyDiv = "#target-dummydiv";

  const url = `https://deepl.com/es/translator#${from}/${to}/${encodeURIComponent(
    text
  )}`;

  const page = await browser.newPage();
  await page.goto(url, { timeout: 60000 });

  let translatedText = "\r\n";
  while (translatedText === "\r\n") {
    translatedText = await page.textContent(targetDummyDiv);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 100)
    );
  }

  const translation = translatedText.replace("\r\n", "");
  page.close();
  return translation;
}

process.on("beforeExit", (code) => {
  browser && browser.close();
});

function splitString(str, MAX_LENGTH = 3000) {
  const NEWLINE_REGEX = /\r?\n/;
  let chunks = [];
  let chunk = "";

  // Split by newlines
  const lines = str.split(NEWLINE_REGEX);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (chunk.length + line.length + 1 <= MAX_LENGTH) {
      // Add to current chunk
      chunk += (chunk.length > 0 ? "\n" : "") + line;
    } else {
      // Start a new chunk
      chunks.push(chunk);
      chunk = line;
    }
  }

  // Split by any symbol if necessary
  const remaining = chunk.split("");
  chunk = "";
  while (remaining.length > 0) {
    const char = remaining.shift();
    if (chunk.length + char.length <= MAX_LENGTH) {
      // Add to current chunk
      chunk += char;
    } else {
      // Start a new chunk
      chunks.push(chunk);
      chunk = char;
    }
  }

  // Add the final chunk
  if (chunk.length > 0) {
    chunks.push(chunk);
  }

  return chunks;
}

const sliceArrayIntoChunks = (arr, chunkSize) => {
  const chunks = [];
  let i = 0;
  const n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += chunkSize)));
  }
  return chunks;
};

async function autoSplitNTranslate({ title, text: arrText, limit, from, to }) {
  const chunks = splitString(arrText.join("\n"), limit);
  let out = [];
  const chunkSize = 4;
  const superchunks = sliceArrayIntoChunks(chunks, chunkSize);

  for (const i in superchunks) {
    const superchunk = superchunks[i];
    console.log(
      `Waiting for the batch ${parseInt(i) + 1} out of ${
        superchunks.length
      } to be resolved`
    );
    const translations = await Promise.all(
      superchunk.map((chunk) => translateText({ text: chunk, from, to }))
    );
    out.push(
      ...translations
        .flat()
        .map((i) => i.split(/\n/))
        .flat()
    );
    console.log(
      `${title}, chunk ${parseInt(i) + 1} out of ${
        superchunks.length
      } translated`
    );
  }

  // for (let i in chunks) {
  //   const chunk = chunks[i];
  //   out.push(...(await translateText({ text: chunk, from, to })).split(/\n/));
  //   console.log(`${title}, chunk ${i} out of ${chunks.length} translated`);
  // }
  return out.join("\n");
}

module.exports = {
  autoSplitNTranslate,
};
