import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TagModule} from './tag/tag.module';
import {ConfigModule} from '@nestjs/config';
import {EnvModule} from './env/env.module';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';

// 读到值process.env.NODE_ENV,就使用这个环境；读不到默认是development
// 注1：envFilePath根据读取的环境变量，来切换是开发环境，还是生产环境的配置文件；但仍然和.env没有关系;安装dotenv来解决
const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            username: 'root',
            password: '123456',
            host: 'localhost',
            port: 3306,
            database: 'nest-tb',
            // entities: [__dirname + '/**/*.entity{.ts,.js}'],// 开发环境下可以注释掉，使用同步方式导入实体
            synchronize: true,
            // logging: true,
            retryDelay: 500,
            retryAttempts: 10,
            autoLoadEntities: true,
        }),
        TagModule,
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,// process.env会保存在内存中，提高性能
            envFilePath,
            validationSchema: Joi.object({
                DB_PORT: Joi.number().default(3305), // default()设置默认值，valid()设置可选值
                // DB_PORT: Joi.number().valid(3306, 3308)
                DB_URL: Joi.string().domain(),
                DB_HOST: Joi.string().ip(),
                NODE_ENV: Joi.string().valid('development', 'production').default('development')
            }),
            load: [() => dotenv.config({path: '.env'})] // 注2：安装dotenv，加载.env文件，成为开发、生产环境的共享配置

        }),
        EnvModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
