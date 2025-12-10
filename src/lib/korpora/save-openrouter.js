const fs = require("fs");
const path = require("path");
require("dotenv").config({});
const { getPublicAssetsPath } = require("../paths");

const INPUT_DIR = path.join(getPublicAssetsPath(), "pixra", "cilre-2");
const OUTPUT_DIR = path.join(getPublicAssetsPath(), "pixra", "cilre-xekri-g");
const SUPPORTED_EXT = new Set([".png", ".webp", ".jpg", ".jpeg"]);
const PROMPT = "turn this image into a black and white hand drawn sketch, 1024x1024";
const MODEL = "google/gemini-2.5-flash-image";
const STRING_PREVIEW_LEN = 20;

function trimStringsDeep(value) {
  if (typeof value === "string") {
    return value.length > STRING_PREVIEW_LEN ? value.slice(0, STRING_PREVIEW_LEN) : value;
  }
  if (Array.isArray(value)) {
    return value.map(trimStringsDeep);
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = trimStringsDeep(v);
    }
    return out;
  }
  return value;
}

function getMimeType(ext) {
  switch (ext.toLowerCase()) {
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    default:
      return null;
  }
}

function findImageData(res) {
  const seen = new Set();
  const isObject = (v) => v && typeof v === "object";

  const tryString = (val) => {
    if (typeof val !== "string") return null;
    const dataUrl = val.match(/data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/);
    if (dataUrl) return dataUrl[0];
    return null;
  };

  const stack = [res];
  while (stack.length) {
    const current = stack.pop();
    if (!current || typeof current === "function") continue;
    if (seen.has(current)) continue;
    seen.add(current);

    if (typeof current === "string") {
      const found = tryString(current);
      if (found) return found;
      continue;
    }

    if (Array.isArray(current)) {
      for (const item of current) stack.push(item);
      continue;
    }

    if (isObject(current)) {
      // direct image_url helpers
      if (current.image_url?.url) {
        const found = tryString(current.image_url.url) || current.image_url.url;
        if (found) return found;
      }
      if (current.url && typeof current.url === "string") {
        const found = tryString(current.url) || current.url;
        if (found) return found;
      }
      // inline data object { mime_type, data }
      if (current.mime_type && current.data && typeof current.data === "string") {
        if (current.mime_type.startsWith("image/")) {
          return `data:${current.mime_type};base64:${current.data}`;
        }
      }
      // text/content fields
      if (current.text) stack.push(current.text);
      if (current.content) stack.push(current.content);
      // explore all property values
      for (const value of Object.values(current)) {
        stack.push(value);
      }
    }
  }

  return null;
}

async function downloadImageToBuffer(url) {
  const base64Match = url.match(/^data:image\/\w+;base64,(.+)$/);
  if (base64Match) {
    return Buffer.from(base64Match[1], "base64");
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch generated image (${response.status})`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function generateSketch(imagePath, mimeType, client) {
  const buffer = fs.readFileSync(imagePath);
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${mimeType};base64,${base64}`;

  // Perform the request exactly like the provided curl example.
  const httpRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: PROMPT },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
    }),
  });

  if (!httpRes.ok) {
    const text = await httpRes.text().catch(() => "");
    throw new Error(`HTTP ${httpRes.status} from OpenRouter: ${text.slice(0, 2000)}`);
  }

  const data = await httpRes.json();

  // dump entire SDK response to help debug image handling
  // const trimmed = trimStringsDeep(data);
  // console.log("OpenRouter trimmed response:", JSON.stringify(trimmed, null, 2));

  const message = data?.choices?.[0]?.message;
  const url =
    message?.images?.[0]?.image_url?.url ||
    message?.images?.[0]?.imageUrl?.url ||
    findImageData(message?.content) ||
    findImageData(data);
  if (!url) {
    console.warn("No image data URL found in response; content was:", message?.content);
    return null;
  }

  return downloadImageToBuffer(url);
}

async function main() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENROUTER_API_KEY in environment or .env file");
  }

  // The SDK is ESM-only; use a dynamic import to work in CommonJS.
  const { OpenRouter } = await import("@openrouter/sdk");
  const openrouter = new OpenRouter({ apiKey });

  if (!fs.existsSync(INPUT_DIR)) {
    throw new Error(`Input directory not found: ${INPUT_DIR}`);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const entries = fs.readdirSync(INPUT_DIR);
  const files = entries.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return SUPPORTED_EXT.has(ext) && fs.statSync(path.join(INPUT_DIR, file)).isFile();
  });

  console.log(`Found ${files.length} images to process from ${INPUT_DIR}`);

  // Process every image and save with the original name.
  for (const filename of files) {
    const ext = path.extname(filename);
    const mimeType = getMimeType(ext);
    if (!mimeType) {
      console.warn(`Skipping unsupported file: ${filename}`);
      continue;
    }

    const inputPath = path.join(INPUT_DIR, filename);
    const outputPath = path.join(OUTPUT_DIR, filename);
    if (fs.existsSync(outputPath)) {
      console.log(`↷ Skipping ${filename} (already exists in output)`);
      continue;
    }

    try {
      console.log(`→ Processing ${filename}`);
      const sketchBuffer = await generateSketch(inputPath, mimeType, openrouter);
      if (!sketchBuffer) {
        console.log(`⚠️  No image buffer returned for ${filename}; skipping save.`);
        continue;
      }
      fs.writeFileSync(outputPath, sketchBuffer);
      console.log(`✓ Saved ${outputPath}`);
    } catch (err) {
      console.error(`✗ Failed ${filename}: ${err.message}`);
    }
  }

  console.log("All done.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
