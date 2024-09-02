import {Module} from '@nestjs/common';
import {MainService} from './main.service';
import {MainController} from './main.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Main} from "./entities/main.entity";
import {MainSubscriber} from "./main.subscriber";

@Module({
    imports: [TypeOrmModule.forFeature([Main])],
    controllers: [MainController],
    // 编写了订阅者类main.subscriber.ts，用以监听实体类Main,需要在这里注册
    providers: [MainService, MainSubscriber],
    // providers: [MainService],
})
export class MainModule {
}
