const path = require("path");
const fs = require("fs");
const { getMdPagesPath } = require("./lib/paths");
const md_content = getMdPagesPath();

// Limit parallelism locally so dev machines stay responsive (cap 3). CI can set
// NEXT_BUILD_MAX_CPUS to raise the cap (e.g. 16); unset keeps localhost behavior.
const os = require("os");
const cpuCount = os.cpus().length;
const localCap = 3;
const envCap = process.env.NEXT_BUILD_MAX_CPUS
  ? parseInt(process.env.NEXT_BUILD_MAX_CPUS, 10)
  : NaN;
const maxCpuSetting =
  Number.isFinite(envCap) && envCap > 0 ? envCap : localCap;
const availableCPUs = Math.min(
  maxCpuSetting,
  Math.max(1, cpuCount - 1),
);

/** Redirect old book chapter URLs (e.g. /en/books/learn-lojban/!1) to new paths without "!" prefix. */
function getBookChapterRedirects() {
  const contentDir = getMdPagesPath();
  const redirects = [];
  if (!fs.existsSync(contentDir)) return redirects;
  const langs = fs.readdirSync(contentDir, { withFileTypes: true });
  for (const langDir of langs) {
    if (!langDir.isDirectory()) continue;
    const booksPath = path.join(contentDir, langDir.name, "books");
    if (!fs.existsSync(booksPath)) continue;
    const books = fs.readdirSync(booksPath, { withFileTypes: true });
    for (const bookDir of books) {
      if (!bookDir.isDirectory()) continue;
      const bookPath = path.join(booksPath, bookDir.name);
      const entries = fs.readdirSync(bookPath, { withFileTypes: true });
      for (const e of entries) {
        if (e.isFile() && e.name.endsWith(".md")) {
          const base = e.name.slice(0, -3);
          // Redirect legacy !N (or !name) to N (or name)
          redirects.push({
            source: `/${langDir.name}/books/${bookDir.name}/!${base}`,
            destination: `/${langDir.name}/books/${bookDir.name}/${base}/`,
            permanent: true,
          });
        }
      }
    }
  }
  return redirects;
}

module.exports = {
  // Allow heavy pages (e.g. /de/texts/*) more time to build (default 60s)
  staticPageGenerationTimeout: 180,

  // Use this directory as workspace root so Next.js doesn't infer parent (avoids lockfile warning)
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    cpus: availableCPUs,
  },

  // Optimize compiler settings
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  output: "export",
  async redirects() {
    return getBookChapterRedirects();
  },
  trailingSlash: true,
  env: {
    md_content,
  },
};
