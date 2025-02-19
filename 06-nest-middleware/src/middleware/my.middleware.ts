import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction} from "express";

/**
 * @desc：局部中间件
 * 1.完成局部中间件的定义，这个类实现NestMiddleware接口(use方法)
 * 2.在user.module中注册这个中间件，消费这个局部中间件
 *
 *
 *
 * */
@Injectable()
class MyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('嘿嘿，我在中间件中，执行了~~~~~~~~~~##########');
        next();

    }

}

export default MyMiddleware;