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

    async checkUser(username: string, pwd: string) {
        // 1.用户名核验：前端传入的username和数据库中的username是否一致
        // 2.由于是在数据库中查询，此处的user里已经包含username,password和id了
        const user = await this.checkByDB(username);
        // 2.密码核验
        if (user && user.password === pwd) {
            const {password, ...result} = user;//剔除密码
            return result;// 返回用户信息
        }
        return null;// 用户不存在，密码错误

    }

    async checkByDB(username: string) {
        // 注意：这里的find方法，不用findOne，findOne返回的是对象；而find是返回数组
        const adminList = await this.user_tb.find({where: {username: username}});
        console.log(adminList);
        // 数组的find方法，满足添加的那个元素
        return adminList.find(user => user.username === username)

    }

    /**
     * @name:login
     * @desc: 登录方法login
     * 1.登录路由上，使用了装饰器@UseGuards(AuthGuard('local'))，使用本地策略验证用户名和密码
     *
     * 2.验证通过后，通过local.strategy.ts中的validate方法，返回用户信息（password已经在checkUser方法中过滤掉了）
     * 用户信息格式：{ id: 1,username: 'admin'}
     *
     * 3.本地策略验证通过后，上述用户信息；作为login登录方法的参数；
     * 调用login方法，@Req() request: Request，request.user为上面验证通过后，返回的用户信息，作为生token的载荷
     *
     * 4.payload为token的载荷，可以自定义，但必须包含userId，因为根据userId可以唯一确定一个用户
     *
     *
     *
     * */
    async login(user: User) {
        const payload = {username: user.username, id: user.id};
        const _payload = {id: user.id};
        // 根据载荷payload,使用jwtService的sign方法生成token
        // 前端处理规则：
        // 1.将token存入localStorage
        // 2.在请求头中携带token，格式为：Authorization:Bearer + token
        const access_token = this.jwtService.sign(payload, {expiresIn: '30m'});
        const refresh_token = this.jwtService.sign(_payload, {expiresIn: '7d'});
        console.log("user.id--->", user.id);
        // 3.将生成的token存入数据库
        await this.user_tb.update(user.id, {token: access_token});

        return {
            code: 200,
            message: '成功返回token',
            access_token: access_token,
            refresh_token: refresh_token
        }
    }

    // 刷新token
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
            // 3.重新生成一组新的(access_token,refresh_token)
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

