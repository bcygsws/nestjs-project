import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
/**
 * @desc：参考文档
 * nestjs最佳实践：https://juejin.cn/post/7270464435297189900#heading-9
 *
 * 
 *
 *
 * */
