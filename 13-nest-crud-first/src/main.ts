import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {CommonInterceptor} from "./common/common.interceptor";
// npm i cors @types/cors --save
import * as cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // cors第三方中间件实现跨域
    app.use(cors());

    // 为路由统一加上前缀
    // app.setGlobalPrefix('api/v1');

    app.useGlobalInterceptors(new CommonInterceptor());
    await app.listen(process.env.PORT ?? 3001);
}

bootstrap();


/**
 * @desc:配置模块，环境变量
 * 一、安装相关包
 * npm i @nestjs/config --save
 * 说明：包里封装了dotenv 模块，所以需要写.env文件，读取其中的键值对
 *
 * 二、配置模块
 * 在app.module.ts中引入配置模块，并注册为全局
 *
 * 2.1 nest g res env生成一个env模块
 * localhost:3001/env 访问,返回键值对
 *
 * 2.2 安装包cross-env，在package.json中配置scripts
 *
 * 2.3 安装dotenv，并引入
 * import * as dotenv from 'dotenv';
 *
 * const envFilePath = `.env.${process.env.NODE_ENV||'development'}`;
 * ConfigModel.forRoot({
 *     isGlobal: true,
 *     cache: true,
 *     envFilePath
 *     load: [()=>dotenv.config({path:'.env'})]
 * })
 *
 * load节点，读取到.env配置文件，成为不同环境下，共享配置
 * 当.env.development和.env.production文件配置项，有和.env重名时，则覆盖.env中的配置
 * 这样就达到了预期
 *
 * 三、package.json中配置scripts脚本---使用命令灵活设置数据库密码
 * 3.1 对于start:dev，我们由于在app.module.ts中做了默认环境配置；即：`.env.${process.env.NODE_ENV||'development'}`
 * 会在scripts没有找到cross-env NODE_ENV="",默认为development
 * 3.2 使用命令行来设置数据库密码
 * npx cross-env DB_PASSWORD=123456 npm run start:dev
 *
 * 3.3 请求localhost:3001/env时，返回配置项DB_PASSWORD的值为123456
 * 如此，就可以使用命令行，很方便的灵活设置数据库密码
 *
 * 四、数据库设计
 * 4.1 数据库设计步骤
 * 需求分析------逻辑设计--------数据库创建------维护与优化
 *
 * 4.2 数据库设计三大范式
 *
 * 第一范式
 * 属性具有原子性，即属性不可再分解
 * 例如：高级职称不适合作为一个字段，它包含教授和副教授，
 *
 * 解决：扁平化数据即可，教授和副教授分别作为两个字段
 *
 * 第二范式
 * 记录的唯一性，要求记录具有唯一标识，即实体的唯一性，不存在部分依赖
 * 职工号 姓名 职称 项目号 项目名称
 * 这些字段里，包含 职工信息和项目信息两个逻辑；
 * 职工号---姓名 职工号---职称，姓名和职称都依赖助教
 * 项目号---项目名称，项目号不依赖主键职工号，不满足第二范式
 *
 * 解决：将职工信息和项目信息分别作为两个实体，分别建立两个表
 *
 * 第三范式
 * 如果一个关系属于第二范式，并且在两个或多个属性中不存在函数依赖，这个函数依赖，也称之为传递依赖，则该关系属于第三范式
 * 例如：student表
 * 学号 姓名 年龄 性别 所在院校 院校地址 院校电话
 * 学号---学生---所在院校---院校电话，存在传递依赖
 *
 * 学生：学号 姓名 年龄 性别 外键：院校id
 * 学院：id 学院名称 学院电话
 *
 * 注：不存在传递依赖，满足第三范式
 *
 *
 * @desc：文档阅读
 * nestjs中文网：https://nest.nodejs.cn/
 * TypeOrm:https://typeorm.nodejs.cn/select-query-builder
 * ts枚举类型：https://segmentfault.com/a/1190000040817957
 * 组合与集成的理解：https://blog.csdn.net/m0_61359105/article/details/136889794
 *
 * */
