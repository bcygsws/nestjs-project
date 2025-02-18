import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {ConfigModule} from "./config_module/config.module";
import {DynamicModule} from "./dynamic_module/dynamic.module";
import { UploadModule } from './upload/upload.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    // imports使得UserModule和LoginModule在AppModule中可应用
    imports: [
        UserModule,
        ConfigModule,
        DynamicModule.findDynamic({path: '/bcy'}),
        UploadModule // static静态方法返回了一个动态module
    ]
})
export class AppModule {
}
