import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forRoot({// nestjs接入数据库
            type: 'mysql',
            username: 'root',
            password: '123456',
            host: 'localhost',
            port: 3306,
            database: 'test_db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,// 自动将实体类同步到数据库，生产环境下不要使用
            logging: true,
            retryDelay: 500,// 重连数据库的时间间隔
            retryAttempts: 10,// 重试次数
            autoLoadEntities: true,// 自动加载实体类,forFeature中添加的每个实体类都会自动添加到配置对象的实体数组中
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
