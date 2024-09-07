import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from "./entities/auth.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    // auth.module要使用实体User，所以需要导出TypeOrmModule
    exports: [UsersService]// 导出UsersService
})
export class UsersModule {
}
