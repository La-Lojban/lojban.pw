const path = require("path");
const fs = require("fs");

// Docker image sets IN_DOCKER=true and bind-mounts repo root at /app (see Dockerfile / CI).
const isDocker =
  process.env.IN_DOCKER === "true" || fs.existsSync("/app/md_pages");

// Repository root (contains `data/`, `package.json`, Next app at same level).
const getProjectRoot = () => {
  if (isDocker) {
    return "/app";
  }
  let currentDir = __dirname; // lib/
  while (currentDir !== path.dirname(currentDir)) {
    const dataDirPath = path.join(currentDir, "data");
    if (fs.existsSync(dataDirPath)) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  return path.resolve(__dirname, "..");
};

const projectRoot = getProjectRoot();

const getBasePaths = () => {
  if (isDocker) {
    return {
      src: "/app",
      mdPages: "/app/md_pages",
      publicAssets: "/app/public/assets",
      korporaTsv: "/app/public/assets/korpora-tsv",
      styles: "/app/styles",
      service: "/app/service",
      vreji: "/vreji",
      tmp: "/tmp",
      cwd: "/app",
    };
  }
  return {
    src: projectRoot,
    mdPages: path.join(projectRoot, "data", "pages"),
    publicAssets: path.join(projectRoot, "data", "assets"),
    korporaTsv: path.join(projectRoot, "data", "assets", "korpora-tsv"),
    styles: path.join(projectRoot, "styles"),
    service: path.join(projectRoot, "data", "DNS"),
    vreji: path.join(projectRoot, "data", ".cache"),
    tmp: path.join(projectRoot, "tmp"),
    cwd: projectRoot,
  };
};

const paths = getBasePaths();

module.exports = {
  isDocker,
  paths,
  getMdPagesPath: () => paths.mdPages,
  getKorporaTsvPath: () => paths.korporaTsv,
  getPublicAssetsPath: () => paths.publicAssets,
  getStylesPath: () => paths.styles,
  getServicePath: () => paths.service,
  getVrejiPath: () => paths.vreji,
  getTmpPath: () => paths.tmp,
  getSrcPath: () => paths.src,
  getCwd: () => paths.cwd,
};
