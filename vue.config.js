module.exports = {
	chainWebpack: (config) => {
		config.module
			.rule('eslint')
			.use('eslint-loader')
			.tap((options) => {
				// modify the options...
				options.fix = true
				return options
			})
	},
}
