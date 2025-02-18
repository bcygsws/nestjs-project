import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {ListModule} from './list/list.module';
import {PersonModule} from './person/person.module';
import {ConfigModule} from './config/config.module';
import { DynModule } from './dyn/dyn.module';

@Module({
    imports: [UserModule, ListModule, PersonModule, ConfigModule, DynModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

/**
 * @desc:nestjs模块的用法
 *
 * 1.基本用法：
 * 在哪里需要使用哪个模块，就使用imports引入
 * 2.共享模块：
 * 例如user的UserService，list模块要使用；需要user先使用exports共享出来;
 * 使用处：有两种处理方式：
 * 1.要使用ListService类，providers引入Service类就好
 * 2.如果要使用 list模块中的多个服务，也可以直接在imports中引入list模块即可
 *
 * 例如：user模块中，需要使用list模块的ListService服务
 *
 * 3.全局模块:
 * @Global ()装饰器声明后，其他模块无需再类似2一样，就可以使用这个全局的Service类
 * person是一个全局模块，仍然需要使用exports导出全局模块的Service类，
 * 其他模块不需要再引入（providers引入Service类或者imports引入Module），就可以使用person模块的PersonService服务
 * 例如：list模块，调用全局模块person的PersonService服务
 *
 * 4.动态模块：
 * 需要在config.module.ts中，的ConfigModule类中，定义一个含参静态方法，返回一个动态模块
 *
 * dyn模块中，使用config生成的动态模块
 * dyn.module.ts需要在imports中导入
 *
 * */
