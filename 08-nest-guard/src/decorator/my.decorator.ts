import {createParamDecorator, ExecutionContext, SetMetadata} from "@nestjs/common";
import {Request} from 'express';

/**
 * @desc:自定义装饰器
 * 一、简单的定义函数来替换；
 * 很容易理解，类似一个函数，返回setMetadata()
 * @Role(['admin'])就可以取代user.controller.ts中的
 * SetMetadata('role',['admin'])
 *
 * 二、使用创建装饰器的方法
 * createParameterDecorator
 *
 * */
// 使用...args后，在user.controller.ts中引入时，只写"admin"就可以了；再写["admin"]报错
// ...args="admin"--->args: string[]
    // args的类型断言时string[]
export const Role = (...args: string[]) => {
        console.log(typeof args);// object
        console.log(Array.isArray(args));// true表示数组，false表示对象
        console.log(args instanceof Array);// true
        console.log("args===", args);// args=['admin']
        return SetMetadata('role', args);
    }

// 方式二：使用createParameterDecorator(callback),自定义一个参数装饰器@ReqUrl()
export const ReqUrl = createParamDecorator((data, ctx: ExecutionContext) => {
    console.log("data===", data);
    const req = ctx.switchToHttp().getRequest<Request>();
    return req.url;

});