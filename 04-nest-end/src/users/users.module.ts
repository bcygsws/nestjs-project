import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from "./entities/auth.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersController} from './users.controller';
import {AuthService} from "../auth/auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, AuthService],
    // auth.module要使用实体User，所以需要导出TypeOrmModule
    exports: [UsersService],
    controllers: [UsersController]// 导出UsersService
})
export class UsersModule {
}
