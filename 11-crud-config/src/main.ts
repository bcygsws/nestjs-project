import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {CommonInterceptor} from "./common/common.interceptor";
// npm i cors @types/cors --save
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.useGlobalInterceptors(new CommonInterceptor());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();


/**
 * @desc：文档阅读
 * nestjs中文网：https://nest.nodejs.cn/
 * TypeOrm:https://typeorm.nodejs.cn/select-query-builder
 * ts枚举类型：https://segmentfault.com/a/1190000040817957
 * 组合与集成的理解：https://blog.csdn.net/m0_61359105/article/details/136889794
 *
 * */
