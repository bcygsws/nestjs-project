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
