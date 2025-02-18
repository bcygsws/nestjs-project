/**
 * @动态模块
 * 主要用它传参
 *
 * */
import {Global, Module} from "@nestjs/common";

interface IOptions {
    path: string
}

@Global()
@Module({})
    // 使用static静态方法，在模块dynamicModule中生成了一个新的模块，该模块别名为 DYNAMIC
export class DynamicModule {
    static findDynamic(options: IOptions) {
        return {
            module: DynamicModule,
            providers: [
                {
                    provide: 'DYNAMIC',
                    useValue: {baseUrl: '/api' + options.path}
                }
            ],
            // 导出返回的这个动态模块，使其成为共享模块；使用@Inject('DYNAMIC') 注入到user的controller构造函数中
            exports: ['DYNAMIC']
        }
    }

}