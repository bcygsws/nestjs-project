import {Injectable, NestMiddleware} from "@nestjs/common";

/**
 * @中间件
 * 类似vue中的beforeEach
 * 在路由请求发送以前，做一些拦截处理（比如：白名单、跨域）
 * 中间件分类：
 * a.局部中间件  Logger中间件类，UserModule消费了它
 * b.全局中间件  全局中间件是一个方法，定义在main.ts中
 *
 * c.第三方库中间件.例如：cors
 * 1.安装包cors
 * 2.
 *
 *
 *
 * */
// 局部中间件
import {Request, Response, NextFunction} from 'express';

// 1.定义一个中间件类Logger,它实现了NestMiddleware接口，就要实现接口中的use方法;同时，使用@Injectable装饰器，表示它可以被IoC容器管理
// 2.在user模块中消费它，UserModule类实现NestModule接口，实现接口中的configure方法
@Injectable()
export class Logger implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // console.log(req);
        // 做一些拦截的逻辑
        // 例如：白名单whiteList
        const whiteList = ['/user/num', '/user/obj'];
        console.log('嘿嘿，我在中间件中，执行了');
        if (whiteList.includes(req.path)) {// 当前路由在白名单列表中，则放行
            next();
        } else {
            res.send("糟糕，被中间件拦截了");
        }


        // 测试全局中间件时，注释掉上面代码
        // next();

    }
}