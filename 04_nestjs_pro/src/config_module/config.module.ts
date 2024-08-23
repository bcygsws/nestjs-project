/**
 * @定义全局模块
 * 使用@Global装饰器
 *
 * */
import {Global, Module} from "@nestjs/common";
@Global()

@Module({
    providers: [{
        provide: 'CONFIG',
        useValue: {baseUrl: '/api'}
    }],
    exports: ['CONFIG'] // 即使使用装饰器@Global声明了，它时全局模块，也仍然需要在此处导出
})
export class ConfigModule {
}