const { getMdPagesPath } = require("./lib/paths");
const md_content = getMdPagesPath();

// Detect available CPUs, use all but leave 1 for system
const os = require("os");
const availableCPUs = Math.max(1, os.cpus().length - 1);

module.exports = {
  experimental: {
    // Use available CPUs for parallel builds (leave 1 for system)
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
  // async redirects() {
  //   return redirect;
  // },
  trailingSlash: true,
  env: {
    md_content,
  },
};
