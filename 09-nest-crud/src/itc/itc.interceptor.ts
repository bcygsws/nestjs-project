import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

/**
 * @name:全局的响应拦截器
 * 用以在此项目中格式化 响应数据的格式
 * 1.编写响应拦截器类
 * 2.在main.ts中注册全局响应拦截器
 *
 *
 * */
interface IRes<T> {
  data: T;
}

@Injectable()
export class ItcInterceptor<T = any> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IRes<T>> {
    console.log('拦截器');
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          msg: 'success',
        };
      }),
    );
  }
}
