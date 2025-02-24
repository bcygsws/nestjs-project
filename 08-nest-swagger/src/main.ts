import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {CommonInterceptor} from "./common/common.interceptor";
import {ErrorFilter} from "./error/error.filter";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 响应拦截器
    app.useGlobalInterceptors(new CommonInterceptor());
    // 异常过滤器
    app.useGlobalFilters(new ErrorFilter());
    // const options = new DocumentBuilder().setTitle("bcy的接口文档").setDescription("详细版").setVersion('1').build();
    // 做token的jwt验证：此处添加addBearerAuth();同时，在守卫接口中，也要添加ApiBearerAuth()
    const options = new DocumentBuilder().addBearerAuth().setTitle("bcy的接口文档").setDescription("详细版").setVersion('1').build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api-docs', app, document);
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
/**
 * @desc:nestjs文档的生成
 * 1.安装包
 * npm install  @nestjs/swagger swagger-ui-express --save
 *
 * 2.在main.ts中配置
 *
 *
 *
 *
 * */
