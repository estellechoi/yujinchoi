module.exports = {
	'*.{js,ts,vue},*rc.js': ['yarn lint'],
	'{!(package)*.json,*.code-snippets}': ['yarn lint:prettier --parser json'],
	'package.json': ['yarn lint:prettier --parser json'],
	'*.scss': ['yarn lint'],
}
