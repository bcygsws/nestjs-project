import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
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
        const user = await this.usersService.checkUsername(username);
        if (user && user.password === pwd) {
            const {password, ...result} = user;//剔除密码
            return result;// 返回用户信息
        }
        return null;// 用户不存在，密码错误

    }

    // 登录方法login
    async login(user: User) {
        const payload = {username: user.username, id: user.id};
        const _payload = {id: user.id};
        // 根据载荷payload,使用jwtService的sign方法生成token
        // 前端处理规则：
        // 1.将token存入localStorage
        // 2.在请求头中携带token，格式为：Authorization:Bearer + token
        const access_token = this.jwtService.sign(payload, {expiresIn: '30m'});
        const refresh_token = this.jwtService.sign(_payload, {expiresIn: '7d'});
        console.log(user.id);
        // 3.将生成的token存入数据库
        await this.user_tb.update(user.id, {token: access_token});

        return {
            code: 200,
            message: '成功返回token',
            access_token: access_token,
            refresh_token: refresh_token
        }
    }

    // 刷新token的请求
    async refreshToken(token: string) {
        try {
            // 1.验证refresh_token
            const decode = this.jwtService.verify(token);
            // 2.获取用户信息
            const user = await this.user_tb.findOne({
                where: {
                    id: decode.id
                }
            });
            // 3.生成新的access_token和refresh_token
            const access_token = this.jwtService.sign({id: decode.id, username: user.username}, {expiresIn: '30m'});
            const refresh_token = this.jwtService.sign({id: decode.id}, {expiresIn: '7d'});
            return {
                code: 200,
                message: '成功返回token',
                access_token: access_token,
                refresh_token: refresh_token
            }


        } catch (e) {
            throw new HttpException('refresh_token 已过期', HttpStatus.BAD_REQUEST);
        }

    }

}

