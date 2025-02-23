import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {CommonInterceptor} from "./common/common.interceptor";
import {UserFilter} from "./user/user.filter";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    // 配置全局响应拦截器
    app.useGlobalInterceptors(new CommonInterceptor());
    app.useGlobalFilters(new UserFilter());
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
