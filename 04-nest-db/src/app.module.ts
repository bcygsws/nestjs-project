import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UploadModule} from "./upload/upload.module";
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [UploadModule, AuthModule, UsersModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            username: 'root',
            password: '123456',
            host: 'localhost',
            port: 3306,
            database: 'nest_end_db',
            // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,// 在生产环境下，需要关闭该属性，使用entities属性来导入实体
            retryDelay: 500,// 重连间隔时间
            retryAttempts: 10,// 重连次数
            autoLoadEntities: true,// 自动加载实体；有该选项，实体类创建，项目重启就创建了表
        })],


    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
