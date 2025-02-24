import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Request, Response} from 'express';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getRequest<Response>();
        console.log("exception====", exception);
        console.log("res====", res);
        let status = exception?.getStatus();
        res.status(status ?? 403).json({
            data: exception,
            time: new Date(),
            path: req.url,
            status
        });
    }
}
