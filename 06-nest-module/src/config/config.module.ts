import {DynamicModule, Module} from '@nestjs/common';
import {ConfigService} from './config.service';
import {ConfigController} from './config.controller';

export interface IOptions {
    path: string;
}

// 动态模块：为了实现给模块传递一个参数
@Module({
    providers: [ConfigService],
    controllers: [ConfigController],
    exports: [ConfigService]
})


export class ConfigModule {
    static forDyn(options: IOptions): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: 'Config',
                    useValue: {baseApi: '/api' + options.path}
                },
            ],
            exports: [{
                provide: 'Config',
                useValue: {baseApi: '/api' + options.path}
            }],
        };
    }
}
