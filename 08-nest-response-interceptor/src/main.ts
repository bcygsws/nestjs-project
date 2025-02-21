import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {CommonInterceptor} from "./common/common.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 全局使用响应拦截器
    app.useGlobalInterceptors(new CommonInterceptor());
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
