import { Module } from '@nestjs/common';
import { XiaomanService } from './xiaoman.service';
import { XiaomanController } from './xiaoman.controller';

@Module({
  controllers: [XiaomanController],
  providers: [XiaomanService],
})
export class XiaomanModule {}
