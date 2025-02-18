import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {VersioningType} from "@nestjs/common";
import {Request, Response, NextFunction} from 'express';
import * as cors from 'cors';
import {join} from "path";
// 需要引入此类型，为NestFactory.create<>添加泛型；否则报错；app.
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
    // create<>需要加泛型注解<NestExpressApplication>,app.useStaticAssets才会正确显示
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // 开启路由版本控制配置
    app.enableVersioning({
        // 该类型表示版本控制字符拼接在URI中
        type: VersioningType.URI
    });
    /**
     * @ 为上传的图片配置静态资源目录，存入dist/images中的图片，就可以以静态资源的形式访问了
     * 1.将参数一指向的文件夹里的图片，托管在路径：http://localhost:3000/bcy/文件名.jpg
     * 2.图片的存放路径，在upload.module中配置为 src/images
     *
     *
     * */

    // bug：useStaticAssets does not exist on type 'INestApplication'
    // 解决：NestFactory.create加上一个泛型限制
    app.useStaticAssets(join(__dirname, 'images'), {
        prefix: '/bcy' // 必须是 /,斜杆不能少
    })
    // 跨域在中间件上
    app.use(cors({}));

    // const middleWare = (req: Request, res: Response, next: NextFunction) => {
    //     if (req.path === '/user') { // 注释掉局部拦截器后，只剩下/user,请求方式随意，可以放行，其他路由被拦截了
    //         next();
    //
    //     } else {
    //         res.send("太难了，被挡住了去路");
    //     }
    // }
    // app.use(middleWare);// 传入全局中间件，函数名就可以，不需要调用

    await app.listen(3000);
}

bootstrap();

/**
 * 启动项目
 * 一般使用 npm run start:dev,带有监视效果；会跟随项目中代码的修改
 *
 * */
