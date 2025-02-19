import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";

async function bootstrap() {
    // 注意：需要在create<>后断言为NestExpressApplication，否则app中没有useStaticAssets方法提示
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // 设置静态资源虚拟目录，加了前缀后，可以通过http://localhost:3000/bcy/时间戳.png访问静态资源
    app.useStaticAssets(join(__dirname, 'images'), {
        prefix: '/bcy'
    });
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
/**
 * @desc:图片上传后端
 * 1.装包
 * npm install multer @types/multer --save
 *
 * 2.在upload.module.ts中注册multer
 *
 *
 *
 *
 * */