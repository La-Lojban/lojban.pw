// const redirect = require("./config/redirect.json");
const { join } = require("path");
const { getMdPagesPath } = require("./lib/paths");
const md_content = getMdPagesPath();

const prod = process.env.NODE_ENV === "production";
const withPWA = require("next-pwa")({
  dest: "public",
  disable: prod ? false : true,
});

module.exports = withPWA({
  experimental: {
    cpus: 4,
    workerThreads: true,
  },
  swcMinify: true,
  output: 'export',
  // async redirects() {
  //   return redirect;
  // },
  trailingSlash: true,
  // assetPrefix: 'lojban-',
  // webpack: (config, { dev }) => {
  // 	config.module.rules = config.module.rules.map(rule => {
  // 		if (rule.loader === 'babel-loader') {
  // 			rule.options.cacheDirectory = false
  // 		}
  // 		return rule
  // 	})
  // 	return config
  // },
  env: {
    md_content,
  },
});
