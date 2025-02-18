import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 默认后端请求在3000端口
  await app.listen(3000);
}
bootstrap();
