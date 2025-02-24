import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Reflector} from "@nestjs/core";
import {Request} from 'express';


@Injectable()
export class UserGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log('user guard执行了~~~~~');
        // 获取自定义装饰器里的元数据
        // role是键名，在自定义装饰器中声明；context.getHandler()获取有当前注解的方法名
        const admin = this.reflector.get<string[]>('role', context.getHandler());
        console.log("admin====", admin);
        const req = context.switchToHttp().getRequest<Request>();
        return admin.includes(req.query.role as string);
    }
}
