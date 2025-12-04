const { getMdPagesPath } = require("./lib/paths");
const md_content = getMdPagesPath();

module.exports = {
  experimental: {
    // Limit CPU usage for builds
    cpus: 4,
  },
  // Configure Turbopack for better performance
  turbopack: {
    // Limit memory usage
    memoryLimit: 4096,
  },
  output: 'export',
  // async redirects() {
  //   return redirect;
  // },
  trailingSlash: true,
  env: {
    md_content,
  },
};
