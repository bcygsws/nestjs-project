import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { WebcrawlerModule } from './webcrawler/webcrawler.module';

@Module({
  imports: [UserModule, LoginModule, WebcrawlerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
