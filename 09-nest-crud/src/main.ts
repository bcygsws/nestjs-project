import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cors from 'cors';
import {ItcInterceptor} from "./itc/itc.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 跨域设置-使用第三方中间件cors；需要安装cors和对应的类型声明包@types/cors
    app.use(cors());
    app.useGlobalInterceptors(new ItcInterceptor());

    await app.listen(3000);
}

bootstrap()

/**
 * 创建好项目
 * 1.连接数据库
 * 安装包
 * mysql2
 * typeorm
 * @nestjs/typeorm
 * 共计三个包
 *
 * 2.连接数据库
 *
 *
 *
 *
 * */
