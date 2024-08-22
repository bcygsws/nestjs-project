import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {VersioningType} from "@nestjs/common";
import * as session from 'express-session';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 开启路由版本控制配置
    app.enableVersioning({
        // 该类型表示版本控制字符拼接在URI中
        type: VersioningType.URI
    });

    // 注册session
    app.use(session({secret: 'BaoChengyi', name: 'bcy.session', rolling: true, cookie: {maxAge: null}}))


    await app.listen(3000);
}

bootstrap();

/**
 * 启动项目
 * 一般使用 npm run start:dev,带有监视效果；会跟随项目中代码的修改
 *
 * */
