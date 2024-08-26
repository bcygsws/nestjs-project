import { Module } from '@nestjs/common';
import { WebcrawlerService } from './webcrawler.service';
import { WebcrawlerController } from './webcrawler.controller';

@Module({
  controllers: [WebcrawlerController],
  providers: [WebcrawlerService],
})
export class WebcrawlerModule {}
