import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuardModule } from './guard/guard.module';
import { UserModule } from './user/user.module';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
  imports: [GuardModule, UserModule, SwaggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
