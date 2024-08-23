import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {LoginModule} from './login/login.module';
import {ConfigModule} from "./config_module/config.module";
import {DynamicModule} from "./dynamic_module/dynamic.module";

@Module({
    controllers: [AppController],
    providers: [AppService],
    // imports使得UserModule和LoginModule在AppModule中可应用
    imports: [
        UserModule,
        LoginModule,
        ConfigModule,
        DynamicModule.findDynamic({path: '/bcy'}) // static静态方法返回了一个动态module
    ]
})
export class AppModule {
}
