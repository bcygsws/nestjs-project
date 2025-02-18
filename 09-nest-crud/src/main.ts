import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cors from 'cors';
import {ItcInterceptor} from './itc/itc.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 跨域设置-使用第三方中间件cors；需要安装cors和对应的类型声明包@types/cors
    app.use(cors());
    app.useGlobalInterceptors(new ItcInterceptor());

    await app.listen(3000);
}

bootstrap();

/**
 * 创建好项目
 * 1.连接数据库
 * 安装包
 * mysql2
 * typeorm
 * @nestjs/typeorm
 * 共计三个包
 *
 * 2.连接数据库
 *
 * 3.联查
 *
 * 4.事务
 * 在service层中处理，共有三种方式
 *
 * 4.1 在src/manager文件夹演示
 * 处理事务的第三种方式：
 * service类构造函数添加参数：@InjectRepository() money:Repository<Money>,
 * this.money.manager.transaction(async manager => {
 *   //  await manager.save();
 * })
 *
 *
 *
 * @在service类，处理事务的第一种和第二种方式：
 * 注：
 * 1.DataSource是@InjectRestRepository()之外另一种注入方式
 * 2.this.dataSource.getRepository(Main);  注入实体类
 * 之后 就可以链式操作，后面链式调用增删改查方法
 * 3.管理事务的三种方式：
 * main/main.service.ts中注释部分
 *
 *
 * */
