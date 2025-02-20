import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";
import * as cors from 'cors';

async function bootstrap() {
    // const app = await NestFactory.create(AppModule);
    // create使用NestExpress泛型限制，useStaticAssets方法没有提示
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, 'images'), {
        prefix: '/bcy'
    })
    // 配置跨域
    app.use(cors());
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
