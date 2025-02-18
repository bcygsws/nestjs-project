/**
 * @name:MyHttpFilter
 * @description:二、定义一个异常处理过滤器
 * 场景：和情形一互补，是在有请求异常时，过滤异常请求，并返回提示
 * 1.定义http请求过滤器，继承自接口ExceptionFilter;注意：这里不再使用@Injectable()装饰器，而是使用@Catch()
 * 2.实现里面的catch方法
 * 3.同样在main.ts中注册
 * app.useGlobalFilters(new MyHttpFilter())
 *
 * 测试：
 * 在浏览器输入一个请求：
 * http://localhost:3000/baba
 * 就可以返回错误对象：
 * {
 *   "data": "Cannot GET /baba",
 *   "time": "2024-08-25T22:07:51.830Z",
 *   "success": false,
 *   "path": "/baba",
 *   "status": 404
 * }
 *
 *
 * */
import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";

@Catch()

export class MyHttpFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse();
        // 异常码
        const status = exception.getStatus();
        // data中传入整个exception对象（而不是exception.message），管道验证时，便于观察到效果
        response.json({
            data: exception,// 和状态码一样，前面已经配置；异常信息，从exception形参中取值
            time: new Date(),// 异常发生的时间记录下来
            success: false,
            path: request.url, // 哪一个请求接口出错
            status

        })
    }

}