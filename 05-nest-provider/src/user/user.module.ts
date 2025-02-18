import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {UserService2} from "./user.service2";
import {UserService3} from "./user.service3";

@Module({
    controllers: [UserController],
    providers: [
        // 1.正常注入service类
        UserService,
        UserService3,
        // 2.起别名的方式注入service类
        {
            provide: 'XiaoMan',
            useClass: UserService2,
        },
        // 3.同起别名的方式一样，使用@Inject()装饰器，可以读取useValue注入值
        {
            provide: 'JD',
            useValue: ["张三", "李四", "王五"]
        },
        // 4.工厂模式
        {
            provide: 'FACTORY',
            inject: [UserService3],// 工厂中要注入service类，此处不再用providers，而是inject注入
            useFactory: (userService3: UserService3) => {
                // 打印结果：
                // 工厂模式：This action returns all user service3
                console.log(userService3.findAll());// 调用依赖的UserService3类的findAll()方法
                return 123;
            }
        },
        // 5.异步模式
        {
            provide: 'ASYNC',
            useFactory: async () => {
                return await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("异步模式");
                    }, 10000)
                })
            }
        }
    ],
})
export class UserModule {
}
