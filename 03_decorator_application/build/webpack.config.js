const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const devConfig = require('./webpack.dev.config');
const proConfig = require('./webpack.pro.config');

module.exports = (env, argv) => {
	let current = argv.mode === 'development' ? devConfig : proConfig;
	return merge(baseConfig, current);
}