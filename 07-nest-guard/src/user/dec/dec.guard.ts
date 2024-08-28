import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
/**
 * @name:获取元数据装饰器 @SetMetadata('dec',['user'])的守卫类 DecGuard
 * @description:
 * 1.从@nestjs/core中引入反射类，并将依赖注入到当前类中
 *  import {Reflector} from '@nestjs/core';
 *  并注入到当前守卫类
 *
 *
 *
 * */
import {Reflector} from '@nestjs/core';
// 定义类型Request，为context…….getRequest<Request>()设置泛型
import type {Request} from "express";

@Injectable()
export class DecGuard implements CanActivate {
    constructor(private Reflector: Reflector) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // 访问：localhost:3000/user?dec=user 来测试是否获取元数组元素?
        const userArray = this.Reflector.get<string[]>('dec', context.getHandler());
        console.log(userArray);
        const req = context.switchToHttp().getRequest<Request>();
        return userArray.includes(req.query.dec as string);
    }
}
