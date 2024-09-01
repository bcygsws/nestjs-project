import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ManagerModule} from './manager/manager.module';

@Module({
    imports: [
        UserModule,
        ManagerModule,
        TypeOrmModule.forRoot({
            type: 'mysql', //数据库类型
            username: 'root', //账号
            password: '123456', //密码
            host: 'localhost', //host
            port: 3306, //
            database: 'user_db', //库名
            // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件;开发模式下，同步实体开启，该选项可以关闭
            synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库,注：生产环境下，自动将实体同步到数据库时不允许的
            retryDelay: 500, //重试连接数据库间隔
            retryAttempts: 10, //重试连接数据库的次数
            autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
        }),
        ManagerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

TypeOrmModule.forRoot({});
