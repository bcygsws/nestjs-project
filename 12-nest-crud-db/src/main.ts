import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {CommonInterceptor} from "./common/common.interceptor";
// npm i cors @types/cors --save
import * as cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // cors第三方中间件实现跨域
    app.use(cors());

    // 为路由统一加上前缀
    // app.setGlobalPrefix('api/v1');

    app.useGlobalInterceptors(new CommonInterceptor());
    await app.listen(process.env.PORT ?? 3001);
}

bootstrap();


/**
 * @desc:配置模块，环境变量
 * 一、安装相关包
 * npm i @nestjs/config --save
 * 说明：包里封装了dotenv 模块，所以需要写.env文件，读取其中的键值对
 *
 * 二、配置模块
 * 在app.module.ts中引入配置模块，并注册为全局
 *
 * 2.1 nest g res env生成一个env模块
 * localhost:3001/env 访问,返回键值对
 *
 * 2.2 安装包cross-env，在package.json中配置scripts
 *
 * 2.3 安装dotenv，并引入
 * import * as dotenv from 'dotenv';
 *
 * const envFilePath = `.env.${process.env.NODE_ENV||'development'}`;
 * ConfigModel.forRoot({
 *     isGlobal: true,
 *     cache: true,
 *     envFilePath
 *     load: [()=>dotenv.config({path:'.env'})]
 * })
 *
 * load节点，读取到.env配置文件，成为不同环境下，共享配置
 * 当.env.development和.env.production文件配置项，有和.env重名时，则覆盖.env中的配置
 * 这样就达到了预期
 *
 * 三、package.json中配置scripts脚本---使用命令灵活设置数据库密码
 * 3.1 对于start:dev，我们由于在app.module.ts中做了默认环境配置；即：`.env.${process.env.NODE_ENV||'development'}`
 * 会在scripts没有找到cross-env NODE_ENV="",默认为development
 * 3.2 使用命令行来设置数据库密码
 * npx cross-env DB_PASSWORD=123456 npm run start:dev
 *
 * 3.3 请求localhost:3001/env时，返回配置项DB_PASSWORD的值为123456
 * 如此，就可以使用命令行，很方便的灵活设置数据库密码
 *
 *
 *
 * @desc：文档阅读
 * nestjs中文网：https://nest.nodejs.cn/
 * TypeOrm:https://typeorm.nodejs.cn/select-query-builder
 * ts枚举类型：https://segmentfault.com/a/1190000040817957
 * 组合与集成的理解：https://blog.csdn.net/m0_61359105/article/details/136889794
 *
 * */
