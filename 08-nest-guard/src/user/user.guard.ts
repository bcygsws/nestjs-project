import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Reflector} from "@nestjs/core";
import {Request} from 'express';

@Injectable()
export class UserGuard implements CanActivate {
    // 需要注入一个reflector，用来获取元数据
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log('user guard守卫执行了');
        const admin = this.reflector.get<string[]>('role', context.getHandler());
        console.log("admin", admin);
        const request = context.switchToHttp().getRequest<Request>();
        // 简化写法
        // setMetadata('role',['admin'])中的参数，和前端localhost:3000/user?role=admin取值是否一样
        return admin.includes(request.query.role as string);

    }
}
