/**
 * @生产环境下webpack独有配置
 *
 * */
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
	plugins: [new CleanWebpackPlugin()]
};