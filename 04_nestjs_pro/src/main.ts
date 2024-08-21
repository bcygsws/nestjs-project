import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {VersioningType} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableVersioning({
        // 该类型表示版本控制字符拼接在URI中
        type: VersioningType.URI
    });
    await app.listen(3000);
}

bootstrap();

/**
 * 启动项目
 * 一般使用 npm run start:dev,带有监视效果；会跟随项目中代码的修改
 *
 * */
