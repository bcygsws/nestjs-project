import { Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { EnvController } from './env.controller';

@Module({
  controllers: [EnvController],
  providers: [EnvService],
})
export class EnvModule {}
/**
 * @desc:env res模块
 * 测试环境变量配置
 *
 * */