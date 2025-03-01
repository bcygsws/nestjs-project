import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { TagModule } from './tag/tag.module';

@Module({
    imports: [UserModule,
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
        TagModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
