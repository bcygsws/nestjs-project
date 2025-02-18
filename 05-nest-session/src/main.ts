import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as session from 'express-session';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // secret：生成服务端签名，相当于加盐
    // name: 返回客户端key的名称；默认值为:connect.sid；session对话名称
    // rolling: 每次请求时，强行设置cookie,这将会重置过期时间(默认为false,不强行重置)
    // cookie: 设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: undefined }。
    app.use(session({secret: 'XiaoMan', name: 'xm.session', rolling: true, cookie: {maxAge: undefined}}));
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
