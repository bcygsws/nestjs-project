import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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
 * 2.4 对于以上2.3 配置，如果使用yml文件，而不是.env文件？如何实施？
 * 2.4.1 安装包
 * npm i config js-yaml @types/js-yaml --save
 *
 * 2.4.2 在根目录下，新建config目录，新建config.yaml文件，config.development.yaml和config.production.yaml
 *
 * 2.4.3 在src/configuration.ts文件，文件系统读取yaml文件内容，并返回键值对的形式
 *
 *
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
