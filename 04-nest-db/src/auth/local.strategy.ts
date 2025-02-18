import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "./auth.service";
import {Injectable, UnauthorizedException} from "@nestjs/common";

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
// 否则，抛出未授权错误；给前端返回 {"message": "Unauthorized","statusCode": 401}
    async validate(username: string, password: string) {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException()// statusCode:401，返回未授权错误
        }
        return user;// 返回用户信息
    }


}