// const redirect = require("./config/redirect.json");
const { join } = require("path");
const md_content = join(process.cwd(), "md_pages");

const prod = process.env.NODE_ENV === "production";
const withPWA = require("next-pwa")({
  dest: "public",
  disable: prod ? false : true,
});

module.exports = withPWA({
  experimental: {
    // reactCompiler: true,
    cpus: 4,
    workerThreads: true,
  },
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
