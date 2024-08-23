import {Controller, Get, Inject} from '@nestjs/common';
import {AppService} from './app.service';
import {UserService} from "./user/user.service";

// 1.路由地址拼接规则：localhost:3000/+@Controller注解中的字符串+@Get注解中的字符串
@Controller()
export class AppController {
    // 2.将AppService依赖注入到当前类中；就可以使用AppService类的方法，不需要new AppService(),也不要修改；故而声明为private readonly
    // 3.模块-在当前app.controller中访问，userService里封装的函数
    // 4.注意：UserService以别名的形式提供的；导出时，也要导出那个别名；在使用时,也需要@Inject(别名)来引入，这时容易混淆的点
    constructor(private readonly appService: AppService, @Inject('SER') private readonly userService: UserService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    // 访问：localhost:3000/mod
    // 即可使用user模块中的findAll()方法
    @Get('mod')
    getUser(): string {
        return this.userService.findAll();
    }

}
