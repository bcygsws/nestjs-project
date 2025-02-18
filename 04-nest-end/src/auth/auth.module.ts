import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstant} from "../config";
import {JwtStrategy} from "./jwt.strategy";
import {User} from "../users/entities/auth.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    // 导入用户模块，以便调用UsersService中的方法
    // 导入PassportModule模块
    imports: [UsersModule,
        PassportModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: jwtConstant.secret,
            signOptions: {
                expiresIn: jwtConstant.expiresIn
            },
            global: true// 全局模块

        })],// 在auth.service中使用了User实体，需要在当前模块中导入
    // 1.注册本地策略类LocalStrategy
    // 2.注册JWT策略类JwtStrategy
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService] // 导出AuthService服务
})
export class AuthModule {
}
