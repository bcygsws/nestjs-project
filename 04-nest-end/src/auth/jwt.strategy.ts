import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {jwtConstant} from "../config";
import {Injectable} from "@nestjs/common";
// 编写token校验策略

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstant.secret,
        })
    }

    async validate(payload: any) {
        // 返回用户名和用户id值
        return {userId: payload.id, username: payload.username};
    }

}