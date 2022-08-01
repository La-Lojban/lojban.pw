const { join } = require('path')
const md_content = join(process.cwd(), 'md_pages')

module.exports = {
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
		md_content
	},
}