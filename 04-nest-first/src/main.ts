import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {VersioningType} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 知识点1：restful版本控制设置,则请求地址中需要携带版本号，（配合@Controller({path:'',version:'1'})）或者
    // @Version('1')注解实现版本控制；请求地址变成：http://localhost:3000/v1/xiaoman
    // app.module中，仍然是http://localhost:3000
    app.enableVersioning({
        type: VersioningType.URI
    })
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
/**
 * @desc:restful风格接口
 * restful的版本控制：
 * URI versioning 版本在请求的URI中传递（默认）
 * Header versioning 自定义请求标头指定版本
 * Media type versioning 请求的accept标头将指定版本
 *
 *
 * */