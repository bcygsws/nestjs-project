import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {UserService2} from "./user.service2";
import * as console from "console";
import {Logger} from "../middleware";
import {DynamicModule} from "../dynamic_module/dynamic.module";
// 如果DynamicModule模块中，使用@Global()修饰，则只需要在app.module中注册一次；其他模块不需要imports，也能使用
@Module({
    // imports: [DynamicModule.findDynamic({path: '/weiwuji'})],
    controllers: [UserController],
    // providers:[UserService],// 简写方式
    providers: [
        UserService2,
        {// 1.自定义类名-全名称方式,起别名了
            provide: 'SER',
            useClass: UserService
        },
        {// 2.自定义值
            provide: 'TEST',// 非类提供者
            useValue: ['TB', 'JD', 'PDD'] // useValue可以是number，对象或者数组等等任何类型
        },
        // 3.工厂模式-注意：如果useFactory函数中有参数，则需要inject注入类，才能拿到这个对象参数，否则为undefined
        {
            provide: 'FACTORY',
            inject: [UserService2],// 只有使用inject注入UserService2；则useFactory中的参数对象，才能拿到值，否则为undefined
            useFactory: (userService2: UserService2) => {
                console.log("test-factory", userService2.hello());
                return 123;
            }
        },
        // 4.异步提供者
        {
            provide: 'ASYNC',
            inject: [UserService2],
            useFactory: async (userService2: UserService2) => {
                return await new Promise((resolve) => {
                    // 定时器模拟异步操作
                    setTimeout(() => {
                        resolve(userService2.hello());
                    }, 2000)
                })

            }
        }

    ],
    exports: ['SER'] // 若在app.controller中访问当前user模块中的service方法，需要在此处导出这个service方法，使其成为其他模块能够消费的类
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        console.log(consumer);
        /**
         * @consumer消费对象
         * 2.1 consumer调用定义的中间件类Logger,并设置需要拦截的路由
         * 2.2 forRoutes()方法里可以传：
         *
         * a.路由字符串值
         * b.对象值，path为键
         * c.甚至把整个controller塞进去都可以，例如UserController
         *
         *
         * */
        // a.路由字符串值
        // consumer.apply(Logger).forRoutes('/user/hi');

        // forRoutes: for有支持的意思；
        // forRoutes把路由和当前中间件关联起来;forRoutes中的路由，在规则白名单内，放行；在规则外，就被拦截

        // b.path键对象
        // localhost:3000/user GET,被拦截了  /user不在白名单，get方式，限定在forRoutes()参数里；执行路由被拦截的分支
        // localhost:3000/user POST,放行了  /user不在白名单，post方式，也没有在forRoutes()中，这个路由没有消费中间件，能够通过
        consumer.apply(Logger).forRoutes({ path:'user',method: RequestMethod.GET});

        // c.传入controller对象
        // consumer.apply(Logger).forRoutes(UserController);// 中间件use方法中的白名单路由生效，其余的user路由全部被拦截


    }
}
