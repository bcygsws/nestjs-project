import { Module } from '@nestjs/common';
import { DynService } from './dyn.service';
import { DynController } from './dyn.controller';
import {ConfigModule} from "../config/config.module";

@Module({
  imports: [ConfigModule.forDyn({path:'/deepseek'})],
  controllers: [DynController],
  providers: [DynService],
})
export class DynModule {}
