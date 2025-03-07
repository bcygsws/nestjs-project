import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule, TypeOrmModuleAsyncOptions} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from '@nestjs/config';
import {EnvModule} from './env/env.module';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import {ConfigEnum} from "./enum/env.enum";
import {UserModule} from './user/user.module';

// 读到值process.env.NODE_ENV,就使用这个环境；读不到默认是development
// 注1：envFilePath根据读取的环境变量，来切换是开发环境，还是生产环境的配置文件；但仍然和.env没有关系;安装dotenv来解决
const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forRootAsync({// TypeOrmModule模块里继续使用其他模块的方法
            imports: [ConfigModule],
            inject: [ConfigService],// 必须注入，才能在 useFactory工厂模式中使用
            useFactory: async (configService: ConfigService) => {
                return {
                    type: configService.get(ConfigEnum.DB_TYPE),
                    username: configService.get(ConfigEnum.DB_USERNAME),
                    password: configService.get(ConfigEnum.DB_PASSWORD),
                    host: configService.get(ConfigEnum.DB_HOST),
                    port: configService.get(ConfigEnum.DB_PORT),
                    database: configService.get(ConfigEnum.DATABASE),
                    // entities: [__dirname + '/**/*.entity{.ts,.js}'],// 开发环境下可以注释掉，使用同步方式导入实体
                    synchronize: configService.get(ConfigEnum.DB_SYNC),
                    // logging: true,
                    retryDelay: 5000,
                    retryAttempts: 10,
                    autoLoadEntities: true
                }

            },
        } as TypeOrmModuleAsyncOptions),

        // TypeOrmModule.forRoot({
        //     type: 'mysql',
        //     username: 'root',
        //     password: '123456',
        //     host: 'localhost',
        //     port: 3306,
        //     database: 'nest-tb',
        //     // entities: [__dirname + '/**/*.entity{.ts,.js}'],// 开发环境下可以注释掉，使用同步方式导入实体
        //     synchronize: true,
        //     // logging: true,
        //     retryDelay: 500,
        //     retryAttempts: 10,
        //     autoLoadEntities: true,
        // }),
        ConfigModule.forRoot({
            isGlobal: true,
            // cache: true,// process.env会保存在内存中，提高性能
            load: [() => dotenv.config({path: '.env'})], // 注2：安装dotenv，加载.env文件，成为开发、生产环境的共享配置
            envFilePath,
            validationSchema: Joi.object({
                DB_TYPE: Joi.string().valid('mariadb', 'mysql').default('mysql'),// 源码：MysqlConnectionOptions.d.ts查看mariadb
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DATABASE: Joi.string().required(),
                // DB_HOST: Joi.string().ip(),
                DB_HOST: Joi.alternatives().try(Joi.string().ip(), Joi.string().domain()),
                // DB_PORT: Joi.number().valid(3306, 3307)
                DB_PORT: Joi.number().default(3307), // default()设置默认值，valid()设置可选值
                // DB_URL: Joi.string().domain(),
                NODE_ENV: Joi.string().valid('development', 'production').default('development')
            }),

        }),
        EnvModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
