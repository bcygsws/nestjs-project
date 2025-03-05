/**
 * @使用环境配置相关包
 * 方式一、
 * dotenv
 *
 * 方式二、
 * config
 * js-yaml
 *
 * 辅助切换环境：
 * cross-env:辅助包，用于设置脚本，切换不同环境
 *
 * 一、dotenv库
 * .env 文件，内容写成键值对方式 key=value
 * DB_HOST="localhost"
 * DB_USER="localhost"
 * DB_PASSWORD=123456
 *
 * 1.1 CommonJS规范
 * require('dotenv').config();
 * console.log(process.env.DB_HOST);
 *
 * 1.2 es6规范
 * import * as dotenv from 'dotenv';
 * dotenv.config();
 *
 * 二、dotenv处理配置较少，且嵌套较少的情况；
 * 对于配置较多，且嵌套较多的情况，推荐使用config库
 * 2.1 config库可以直接读取json文件，并返回一个对象
 * 2.2 安装一个额外的识别库：js-yaml；config库读取yml格式文件了d
 *
 * 2.3 在package.json中，配置cross-env，增加脚本里的属性
 * "dev": "cross-env NODE_ENV=development node index.js",
 * "prod": "cross-env NODE_ENV=production node index.js"
 *
 * 2.4 分别运行
 * npm run dev
 * npm run prod
 * 观察控制台打印结果
 *
 * 2.5 将config/default.json文件，config/production.json文件,修改为yaml文件，并注释掉其中的内容
 *
 *
 * */

// 方式一：dotenv
//require('dotenv').config();
//console.log('===',process.env);
// 在打印的对象中就可以读取到TOKEN、DB_HOST、DB_USER、DB_PASSWORD、DB_PORT

// 方式二、config+js-yaml
const config=require('config');
console.log(config.get('db'));
console.log("port====",config.get('db').port);


