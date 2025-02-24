import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {map, Observable} from 'rxjs';

export interface IRes<T> {
    data: T;
}

@Injectable()
export class CommonInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IRes<string>> {
        // return next.handle();
        return next.handle().pipe(map((data: string) => {
            console.log("data=====", data);
            return {
                data,
                code: 200,
                msg: 'success'
            }
        }));
    }
}
