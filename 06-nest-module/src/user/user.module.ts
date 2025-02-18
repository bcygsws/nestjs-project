import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {ListService} from "../list/list.service";
import {ListModule} from "../list/list.module";

// 方式一：只注入ListService类

// @Module({
//     controllers: [UserController],
//     providers: [UserService, ListService],
// })
// export class UserModule {
// }

// 方式二、注入ListModule整个模块，此时就不需要在providers中再注入ListService了

@Module({
    imports: [ListModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {
}
