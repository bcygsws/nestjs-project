import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {UserGuard} from "./user/user.guard";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.useGlobalGuards(new UserGuard());
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
