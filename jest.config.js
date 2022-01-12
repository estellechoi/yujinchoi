module.exports = {
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
	transform: {
		'^.+\\.vue$': 'vue-jest',
	},
	collectCoverage: true,
	collectCoverageFrom: [
		'**/*.{ts,vue}',
		'!**/node_modules/**',
		'!**/coverage/**',
		'!**/tests/**',
	],
}
