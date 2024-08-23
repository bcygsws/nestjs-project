import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {UserService2} from "./user.service2";

@Module({
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
export class UserModule {
}
