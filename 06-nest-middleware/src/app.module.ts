import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [UserModule, ListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/**
 * @desc:nestjs中间件
 * 一、第三方中间件，用于后端实现跨域，应用很广泛
 * 1.1 装包：第三方中间件cors
 * npm i cors @types/cors --save
 *
 * 1.2 在main.ts文件中完成注册
 * app.use(cors());
 *
 * 二、局部中间件
 * 注释掉：app.use(GlobalMiddleware);
 * 2.1 定义一个局部中间件类
 *
 *
 *
 *
 *
 * 三、全局中间件
 * 3.1 定义全局中间件
 * function middlewareAll(req, res, next) {
 *    console.log(req);
 *     next();
 * }
 *
 * 3.2 同cors一样；在main.ts中注册
 * app.use(middlewareAll)
 *
 *
 *
 *
 *
 *
 *
 * */
