import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LoginModule} from './login/login.module';
import {UploadModule} from "./upload/upload.module";

@Module({
    imports: [LoginModule, UploadModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
