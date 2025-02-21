import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import {map, Observable} from 'rxjs';

//自定义intercept方法的返回值Observable<any>
export interface IData<T>{
  data: T;
}
@Injectable()
export class CommonInterceptor<T=any> implements NestInterceptor {
  // 默认返回值是Observable<any>
  intercept(context: ExecutionContext, next: CallHandler): Observable<IData<T>> {
    console.log('响应拦截器执行了');
    console.log("next====",next);
    console.log("打印",next.handle());
    // return next.handle();
    // 也即：next.handle().pipe(map()) 通过管道，返回格式化前的响应数据
    // 在前面下载图片章节，压缩成二进制流文件，tarStream.pipe(res)，
    return next.handle().pipe(map((data) => {
      console.log('data======',data);
      return {
        data,
        code: 200,
        message: '请求成功',
        success: true
      }
    }));
  }
}
/**
 * 发一个请求，响应拦截器，在响应最终返回前，执行
 * 响应拦截器执行了
 * 打印next.handle()
 * Observable {
 *   source: Observable { _subscribe: [Function (anonymous)] },
 *   operator: [Function (anonymous)]
 * }
 *
 *
 *
 * */