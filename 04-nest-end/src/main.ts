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
        secret: 'BaoChengyi',// secret:作为服务端生成session的签名，是字符串
        name: 'bcy.session',// name:返回客户端key的名称；session对话名称
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

/*
* @一、登录模块接入数据库
* 1.安装包
* npm i @nestjs/typeorm typeorm mysql2 --save
* 2.配置TypeOrmModule.forRoot()和TypeOrmModule.forFeature()
*
*
*
*
*
*
*
* @nestjs中 passport本地策略和jwt鉴权
* 参考文档：
* https://blog.csdn.net/Superman_H/article/details/129173137
* https://juejin.cn/post/7386875278423638051#heading-21
* 1.UsersService模块，用于从数据库中查询用户信息，并验证用户名
* 2.AuthService模块，用于成功验证密码后，
* 3.本地策略类，用于在陆续验证用户名和密码后，通过一个validate方法，检查用户的凭据是否有效,有效则返回用户信息；无效
*
*
*
*
*
*
* */
