import {Module} from '@nestjs/common';
import {TagService} from './tag.service';
import {TagController} from './tag.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tags} from "../user/entities/tag.entity";
import {User} from "../user/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Tags, User])],
    controllers: [TagController],
    providers: [TagService],
})
export class TagModule {
}
