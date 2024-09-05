import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/auth.entity";
import {Repository} from "typeorm";


@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService,
                @InjectRepository(User) private readonly user_tb: Repository<User>) {

    }

    // 检验用户是否存在？并验证密码

    async validateUser(username: string, pwd: string) {
        // 获取用户
        const user = await this.usersService.doUnameMatch(username);
        if (user && user.password === pwd) {
            const {password, ...result} = user;//剔除密码
            return result;// 返回用户信息
        }
        return null;// 用户不存在，密码错误

    }

    // 登录方法login
    async login(user: User) {
        const payload = {username: user.username, sub: user.id};
        // 根据载荷payload,使用jwtService的sign方法生成token
        // 前端处理规则：
        // 1.将token存入localStorage
        // 2.在请求头中携带token，格式为：Authorization:Bearer + token
        const access_token = this.jwtService.sign(payload);
        console.log(user.id);
        // 3.将生成的token存入数据库
        await this.user_tb.update(user.id, {token: access_token});

        return {
            code: 200,
            message: '成功返回token',
            access_token: access_token
        }
    }
}

