import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "./auth.service";
import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";

/**
 * 使用本地策略，验证用户名和密码是否正确
 *
 * */
// 通过PassportStrategy使用local策略
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

// 注：对于本地策略，用户需要一个具有以下签名的validate(username,password)方法，如果找到了用户，并且凭据有效，则返回用户对象；
// 否则，给前端(response.data值)返回 {"message": "用户名或密码错误",error:"bad request","statusCode": 400}
    async validate(username: string, password: string) {
        // 依次核验 用户名、密码
        const user = await this.authService.checkUser(username, password);
        if (!user) {
            throw new BadRequestException('用户名或密码错误');// statusCode:400，返回请求错误
        }
        return user;// 返回用户信息
    }


}