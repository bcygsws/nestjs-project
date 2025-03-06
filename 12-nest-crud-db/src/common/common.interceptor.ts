import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable,map} from 'rxjs';

export type IRes<T> = {
    data: T;
};

@Injectable()
export class CommonInterceptor<T=any> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IRes<T>> {
        // return next.handle();
        return next.handle().pipe(map((data) => {
            console.log('响应拦截器执行了~~~~~~~data', data);
            return {
                data,
                code: 200,
                msg: 'success'
            }
        }));
    }
}
