import {Module} from '@nestjs/common';
import {ListService} from './list.service';
import {ListController} from './list.controller';

@Module({
    controllers: [ListController],
    providers: [ListService],
    exports: [ListService]// 共享给user模块使用
})
export class ListModule {
}
