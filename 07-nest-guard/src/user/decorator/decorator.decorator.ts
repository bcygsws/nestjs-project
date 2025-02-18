import {createParamDecorator, ExecutionContext, SetMetadata, applyDecorators} from '@nestjs/common';
import type {Request} from 'express';

// 1.上一节守卫的使用，相当于自己重写了@SetMetadata('role',['admin'])装饰器
// @MyDecorator(['user']) 等价于相当于自己重写了@SetMetadata('role',['admin'])

export const MyDecorator = (args: string[]) => SetMetadata('dec', args);

// 2.自定义参数装饰器
// 功能：自定义一个返回请求url的装饰器，之后在user的controller文件中测试
// export const MyURL = createParamDecorator((data, ctx: ExecutionContext) => {
//     const req = ctx.switchToHttp().getRequest<Request>();
//     console.log(req.url);
//     return req.url;// 返回当前路由的url地址
// })

// 3.聚合装饰器
export const MyURL = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    console.log(req.url);
    return req.url;
    // return applyDecorators(MyDecorator,装饰器2,……);//
})