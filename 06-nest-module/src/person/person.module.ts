import {Global, Module} from '@nestjs/common';
import {PersonService} from './person.service';
import {PersonController} from './person.controller';

@Global()
@Module({
    controllers: [PersonController],
    providers: [PersonService],
    exports: [PersonService],
})
export class PersonModule {
}
