const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 注：当将webpack.config_module.js配置文件从根目录下，移动至build文件夹时，当前配置文件路径下降了一级；相应的涉及
 * 其他文件夹的路径，要升一级；例如：path.resolve(__dirname,'../src/index.ts')
 *
 * */

module.exports = {
	entry: path.resolve(__dirname, '../src/index.ts'), // 指定入口文件
	output: {// 指定打包文件所在目录
		path: path.resolve(__dirname, '../dist'),
		filename: 'bundle.js',
		environment: {
			arrowFunction: false// 关闭webpack的箭头函数
		}

	},

	devServer: {
		//contentBase: "./dist"
		// 新版本contentBase键名，已经使用static替换了
		static: "./dist",
		port: 8080,
		host: "localhost",
		open: true,// 项目运行后，自动打开浏览器
		hot: true// 热更新
	},
	resolve: {// 用来设置引用模块
		extensions: ['.js', '.ts']
	},
	module: {// 配置webpack的module
		rules: [
			{
				test: /.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {// 设置babel
							presets: [
								[
									'@babel/preset-env',// 指定环境的插件
									{// 配置信息：要兼容的目标浏览器
										targets: {
											browsers: ["last 2 versions", "ie >= 11"]
										},
										corejs: 3,// 指定使用的polyfill库的版本号
										useBuiltIns: 'usage'// 指定babel在转换过程中，需要加polyfill代码，以保证兼容性；使用corejs的方式，usage表示按需加载

									}
								]
							],
							plugins: [// babel-plugin-import配置，使得库按需加载，以减少打包的体积
							]
						}

					},
					{
						loader: 'ts-loader'
					}],
				exclude: /node_modules/
			}
		]

	},
	plugins: [
		new HtmlWebpackPlugin({// 在dist中生成html文件
			template: path.resolve(__dirname, '../public/index.html')// 指定打包成的html文件的模板
		})

	]

}


/**
 * @ts配置webpack步骤：
 * 参考文档：https://blog.csdn.net/weixin_44972008/article/details/121639173
 * 1.安装webpack webpack-cli webpack-dev-server
 * 注意：webpack-cli要升级到5+版本，以匹配5+版本的webpack;否则出现兼容错误
 *
 * 2.安装ts-loader和typescript
 * ts-loader 用于编译ts文件
 * typescript ts编译器
 *
 * 3.安装
 * html-webpack-plugin 用于创建html，将html文件托管在内存中
 * clean-webpack-plugin 安装后，每次构建build,都会清除上一次构建生成的文件
 *
 * 4.除了webpack,除了webpack，开发中还经常需要结合babel来对代码进行转换以使其可以
 * 兼容到更多的浏览器，通过以下步骤可以将babel引入到项目中
 * 安装
 * babel-loader babel加载器
 * @babel/preset-env  包含了ES所有新特性的转换规则
 * @babel/core babel核心包
 * polyfill库常用两种：
 * core-jspolyfill库的一种
 * 另外一个库是regenerator
 * polyfiil技术：就是利用兼容ES5语法实现新的内建变量，并扩展内建变量的静态属性(Array.from())和实例属性([].includes)
 * 参考文档：https://www.jianshu.com/p/9244b3dafbc2
 *
 * 性能优化：
 * 1.babel中在原有基础上，安装babel-plugin-import
 * 分析：按需加载库中的模块，以减少打包的体积
 *
 *
 *
 *
 * */