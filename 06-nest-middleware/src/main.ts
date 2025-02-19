import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cors from 'cors';
import GlobalMiddleware from "./global_middleware/global.middleware";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 注：后端使用cors第三方中间件实现跨域
    app.use(cors());
    // 使用全局中间件
    // app.use(GlobalMiddleware);
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
