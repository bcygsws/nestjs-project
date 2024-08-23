import {Injectable} from '@nestjs/common';
import {LoginService} from "./login/login.service";

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    getAbout(loginService: LoginService): string {
        return '';
    }
}
