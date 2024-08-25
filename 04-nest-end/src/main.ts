import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as session from 'express-session';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from 'path';
import * as cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // 1.注册session
    app.use(session({
        secret: 'BaoChengyi',
        name: 'bcy.session',// session对话名称
        rolling: true,// 每次请求时，强行设置cookie,这将会重置过期时间
        cookie: {maxAge: null}// 设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。

    }));
    // 2.配置跨域中间件cors
    app.use(cors());
    // 为静态资源图片设置虚拟目录
    // 设置前缀后，需要通过 http://localhost:3000/bcy/1724525104910.jpg 访问到图片
    app.useStaticAssets(join(__dirname, 'images'), {
        prefix: '/bcy' // 斜杆不能少
    })

    await app.listen(3000);
}

bootstrap();
