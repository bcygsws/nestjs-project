import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Request, Response} from 'express';

@Catch(HttpException)
export class UserFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();
        // 状态码
        const status = exception.getStatus();
        console.log("exception====", exception);
        console.log("exception====", exception);
        res.status(status).json({
            data: exception,
            time: new Date(),
            path: req.url,
            status
        });
    }
}
