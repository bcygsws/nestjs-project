import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import MyMiddleware from "../middleware/my.middleware";

@Module({
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        console.log("consumer===", consumer);
        // apply()方法里注入middleware/my.middleware.ts中间件类，提供给特定路由或者控制器消费

        // 注：消费中间件时，forRoutes()方法里可以传：字符串、对象甚至controller类名

        // 1.写成字符串这种形式，则/user的get和post请求都能消费中间件
        // consumer.apply(MyMiddleware).forRoutes('/user');

        // 2.只有/user路由，get请求才会消费中间件
        // consumer.apply(MyMiddleware).forRoutes({path: '/user', method: RequestMethod.GET});

        // 3.传入一个controller类名
        consumer.apply(MyMiddleware).forRoutes(UserController);
    }
}
