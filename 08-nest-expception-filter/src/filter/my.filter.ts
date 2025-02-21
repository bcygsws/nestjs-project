import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Request, Response} from 'express';

/**
 * @desc:测试方式
 * 好处：如果调用一个当前项目中不存在的接口,项目报错了，需要重启项目？
 * 使用异常过滤器以后，浏览器会返回一个json格式的数据，项目就不不熬错了
 *
 * 例如：http://localhost:3000/user1
 *
 * 测试结果：
 * {"data":"Cannot GET /user1","time":"2025-02-21T18:09:25.413Z","success":false,"path":"/user1","status":404}
 * 结合上节，响应拦截器；可以给正常返回的接口，响应信息做统一的格式化
 * src/common
 *
 * */

@Catch(HttpException)
export class MyFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log("异常过滤器执行");
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();
        // 状态码：采用到exception,其余请求和响应从host参数中获取
        const status = exception.getStatus();
        console.log("status====", status);

        res.status(status).json({
            data: exception.message,
            time: new Date(),
            success: false,
            path: req.url,// 哪一个请求接口出错，req.url可以获取到
            status
        });
    }
}
