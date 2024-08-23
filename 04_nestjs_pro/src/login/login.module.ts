import {Module} from '@nestjs/common';
import {LoginService} from './login.service';
import {LoginController} from './login.controller';

@Module({
    controllers: [LoginController],
    // 1.简写方式
    // providers: [LoginService],
    // 2.全名称方式，可以起别名
    // 此时，重启项目，会报错；令牌更改了，也要在controller文件中，使用@Inject('ABC')
    // 装饰器，添加到controller文件的构造函数参数上
    providers: [
        {
            provide: 'ABC',
            useClass: LoginService// 类提供者
        }

    ]
})
export class LoginModule {
}
