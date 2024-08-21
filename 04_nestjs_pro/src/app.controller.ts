import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';

// 1.路由地址拼接规则：localhost:3000/+@Controller注解中的字符串+@Get注解中的字符串
@Controller()
export class AppController {
    // 2.将AppService依赖注入到当前类中；就可以使用AppService类的方法，不需要new AppService(),也不要修改；故而声明为private readonly
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
