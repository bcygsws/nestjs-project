import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {RoleGuard} from "./guard/role/role.guard";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 全局注册守卫
    // app.useGlobalGuards(new RoleGuard());

    // 注册swagger
    // 1.定义配置项
    const options = new DocumentBuilder().addBearerAuth().setTitle('夕颜若雪的API接口文档').setDescription('Restful API').setVersion('1').build();
    // 2.根据配置，创建文档
    const document = SwaggerModule.createDocument(app, options);
    // 3.为文档设置访问地址
    SwaggerModule.setup('/api-docs', app, document);
    // 完成上述配置，就可以使用 localhost:3000/api-docs访问接口文档了,进一步细化需要在controller文件中，逐项配置


    await app.listen(3000);
}

bootstrap();
/**
 * @一、nestjs的守卫，guard中演示
 * 守卫是一个单独的责任
 *
 * 1.概念：它根据 运行时所出现的条件（权限、角色和访问控制列表等等）来确定给定的请求是否由路由程序处理
 * 2.nest守卫执行时机
 * 它在中间件之后，拦截器和管道之前执行
 * 3.局部守卫
 * 在guard.controller文件中，使用装饰器@UseGuards(RoleGuard)语法导入守卫类名即可
 * @UseGuards(RoleGuard)
 * 4.在@Get装饰器上面，可以为接口添加一些元数据限制，再访问该接口时，必须拼接上元数据?role=admin,否则接口会被守卫拦截
 * 5.在守卫类中，注入依赖Reflector
 *
 *
 * 4.全局守卫
 * 和管道、过滤器和拦截器类似，在main.ts文件中处理
 *
 * @二、nestjs自定义装饰器
 * 在user中演示
 *
 *
 * @三、swagger接口文档
 * 在swagger模块中演示
 * 3.1 装包
 * npm i @nestjs/swagger swagger-ui-express -D
 *
 * 3.2 在main.ts中注册swagger
 * 1.定义配置项
 * const options = new DocumentBuilder().setTitle('夕颜若雪的API接口文档').setDescription('Restful API').setVersion('1').build();
 * 2.根据配置，创建文档
 *     const document = SwaggerModule.createDocument(app, options);
 * 3.为文档设置访问地址
 *     SwaggerModule.setup('/api-docs', app, document);
 * 完成上述配置，就可以使用 localhost:3000/api-docs访问接口文档了,进一步细化需要在controller文件中，逐项配置
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * */