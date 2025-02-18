import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Reflector} from '@nestjs/core';
import type {Request} from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
    // 注入依赖Reflector，用它来拿到在装饰器@SetMetadata()设置的元数据
    constructor(private Reflector: Reflector) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // 打印一个日志提示
        console.log("bcdefg");
        // context.getHandler() 获取上下文中处理类
        // context.switchToHttp() 将上下文切换到请求
        const admin = this.Reflector.get<string[]>('role', context.getHandler());
        console.log(admin);// 就能按到泛型限制的字符串数组
        const req = context.switchToHttp().getRequest<Request>();
        // console.log(req);// req.query.role拿到打印的元素值
        // 在controller文件里,做了配置,如果不带上查询字符串?role=admin,路由将被守卫拦截
        // 访问：http://localhost:3000/guard?role=admin ,接口正常；否则：接口被守卫拦截；报错：{"message":"Forbidden resource","error":"Forbidden","statusCode":403}
        return admin.includes(req.query.role as string);
    }
}
