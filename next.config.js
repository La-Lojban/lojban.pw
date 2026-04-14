const path = require("path");
const { getMdPagesPath } = require("./lib/paths");
const md_content = getMdPagesPath();

// Limit parallelism locally so dev machines stay responsive (cap 3, leave one CPU
// free). When NEXT_BUILD_MAX_CPUS is set (e.g. CI), use up to min(env, cpuCount) workers
// so standard 4-vCPU runners can use 4 workers instead of being stuck at cpuCount-1 (=3).
const os = require("os");
const cpuCount = os.cpus().length;
const envCap = process.env.NEXT_BUILD_MAX_CPUS
  ? parseInt(process.env.NEXT_BUILD_MAX_CPUS, 10)
  : NaN;
const hasCpuEnv =
  Number.isFinite(envCap) && envCap > 0;
const availableCPUs = hasCpuEnv
  ? Math.min(envCap, Math.max(1, cpuCount))
  : Math.min(3, Math.max(1, cpuCount - 1));

module.exports = {
  // Allow heavy pages (e.g. /de/texts/*) more time to build (default 60s)
  staticPageGenerationTimeout: 180,

  // Use this directory as workspace root so Next.js doesn't infer parent (avoids lockfile warning)
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    cpus: availableCPUs,
    optimizePackageImports: [
      "@heroicons/react",
      "@headlessui/react",
    ],
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
  images: { unoptimized: true },
  // No `redirects()` here: Next.js ignores them for static export and warns. Legacy book
  // chapter URLs (`/:lang/books/:book/!:chapter`) are handled in pages/404.tsx instead.
  // Root `/` → default locale is pages/index.tsx (meta refresh).
  trailingSlash: true,
  env: {
    md_content,
  },
};
