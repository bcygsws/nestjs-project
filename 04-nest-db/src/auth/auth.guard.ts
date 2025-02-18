import {ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AuthGuard} from "@nestjs/passport/dist/auth.guard";
import {Reflector} from "@nestjs/core";
/**
 * 参考文档：
 * https://blog.csdn.net/Mamong/article/details/136283640
 *
 *
 * */
@Injectable()
// JwtAuthGuard 继承 AuthGuard('jwt'),是含参的构造函数，所以在main.ts中全局注册时，
// app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        /**
         * 1.没有@Auth('permission') 装饰器的路由 auth值为undefined
         * 2.所以需要与运算符连接 auth&&auth.includes('permission'),避免出现 undefined.includes()的错误
         *
         * */
            // 反射机制，实现获取装饰器类Auth上的auth属性值
        const auth = this.reflector.getAllAndOverride<string[]>('auth', [context.getHandler(), context.getClass()]);
        console.log(auth);
        if (auth && auth.includes('permission')) {
            return true;
        }
        return super.canActivate(context);

    }
}
