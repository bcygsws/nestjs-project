import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XiaomanModule } from './xiaoman/xiaoman.module';

@Module({
  imports: [XiaomanModule],// imports引入其他模块
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
