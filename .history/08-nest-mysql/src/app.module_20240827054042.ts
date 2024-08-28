import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({// 配置项

  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
