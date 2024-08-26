import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';

/**
 * @name:拦截器
 * @description:拦截器
 * 拦截器，使用场景推演：
 * res返回的都是字符串对象，对前端来说操作不便
 * 可以使用拦截器做统一处理
 * {
 *     data:
 *     status:
 *     message:
 *     success:
 * }
 *
 * 使用拦截器步骤：
 * 1.定义拦截器类
 * 快捷键：npm g itc common
 * 这里自己定义
 *
 * 2.
 *
 *
 *
 * */
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('user')
    getUser(): string {
        return this.appService.getUser();
    }
}
