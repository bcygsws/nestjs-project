import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";

/**
 * @description:定义拦截器类MyInterceptor
 * 一、定义拦截器类MyInterceptor步骤
 * 1.定义拦截器类MyInterceptor，并使用装饰器，表示它是一个可以被IoC管理的类
 * 2.定义一个接口，限定data的方法，next.handle()只有响应提供的源数据data,所以
 * intercept方法的返回值类型是：Observable<IData<T>>
 *
 * 3.在main.ts中全局注册
 * app.useGlobalInterceptors(new MyInterceptor())
 *
 * 二、定义一个异常处理过滤器
 * 场景：和情形一互补，是在有请求异常时，过滤异常请求，并返回提示
 *
 *
 * */
interface IData<T> {
    data: T
}

@Injectable()
export class MyInterceptor<T = any> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<IData<T>> {
        // 因为next.handle()返回的还是Observable<IData<T>>类型，与返回的响应对象无关
        return next.handle().pipe(map((data) => {
            return {
                data,
                code: 200,
                message: '请求成功',
                success: true
            }
        }));

    }

}