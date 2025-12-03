const path = require("path");
const fs = require("fs");

// Detect if running in Docker
// Check for /app/src directory or IN_DOCKER environment variable
const isDocker = process.env.IN_DOCKER === "true" || fs.existsSync("/app/src");

// Get project root - go up from src/lib to project root
const getProjectRoot = () => {
  // If in Docker, we're at /app/src
  if (isDocker) {
    return "/app";
  }
  // Outside Docker - find project root by looking for data directory or going up from src/lib
  let currentDir = __dirname; // src/lib
  while (currentDir !== path.dirname(currentDir)) {
    // Check if data directory exists (marker for project root)
    const dataDirPath = path.join(currentDir, "data");
    if (fs.existsSync(dataDirPath)) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  // Fallback: assume we're in src/lib, so project root is ../..
  return path.resolve(__dirname, "../..");
};

const projectRoot = getProjectRoot();

// Base paths
const getBasePaths = () => {
  if (isDocker) {
    return {
      src: "/app/src",
      mdPages: "/app/src/md_pages",
      publicAssets: "/app/src/public/assets",
      styles: "/app/src/styles",
      service: "/app/service",
      vreji: "/vreji",
      tmp: "/tmp",
      cwd: "/app/src",
    };
  } else {
    // Outside Docker - use relative paths from project root
    return {
      src: path.join(projectRoot, "src"),
      mdPages: path.join(projectRoot, "data", "pages"),
      publicAssets: path.join(projectRoot, "data", "assets"),
      styles: path.join(projectRoot, "src", "styles"),
      service: path.join(projectRoot, "data", "DNS"),
      vreji: path.join(projectRoot, "data", ".cache"),
      tmp: path.join(projectRoot, "tmp"),
      cwd: path.join(projectRoot, "src"),
    };
  }
};

const paths = getBasePaths();

module.exports = {
  isDocker,
  paths,
  // Helper functions for common paths
  getMdPagesPath: () => paths.mdPages,
  getPublicAssetsPath: () => paths.publicAssets,
  getStylesPath: () => paths.styles,
  getServicePath: () => paths.service,
  getVrejiPath: () => paths.vreji,
  getTmpPath: () => paths.tmp,
  getSrcPath: () => paths.src,
  getCwd: () => paths.cwd,
};

