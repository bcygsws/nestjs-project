import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MyFilter} from "./filter/my.filter";
import {CommonInterceptor} from "./common/common.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new CommonInterceptor())
  app.useGlobalFilters(new MyFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
