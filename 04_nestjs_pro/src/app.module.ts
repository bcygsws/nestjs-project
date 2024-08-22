import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [UserModule, LoginModule],
})
export class AppModule {
}
