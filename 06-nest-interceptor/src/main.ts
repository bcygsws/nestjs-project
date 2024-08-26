import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MyInterceptor} from "./itc";
import {MyHttpFilter} from "./filter";
import {LoginPipe} from "./login/login.pipe";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new MyInterceptor());
    app.useGlobalFilters(new MyHttpFilter());
    app.useGlobalPipes(new LoginPipe());
    await app.listen(3000);
}

bootstrap();
/**
 * 响应拦截器 + http请求过滤器 + pipe管道
 * @description:定义拦截器类MyInterceptor
 * 一、定义拦截器类MyInterceptor步骤
 * 1.定义拦截器类MyInterceptor，并使用装饰器，表示它是一个可以被IoC管理的类
 * 2.定义一个接口，限定data的方法，next.handle()只有响应提供的源数据data,所以
 * intercept方法的返回值类型是：Observable<IData<T>>
 *
 * 3.在main.ts中全局注册
 * app.useGlobalInterceptors(new MyInterceptor())
 *
 * 二、定义一个异常处理过滤器
 * 场景：和情形一互补，是在有请求异常时，过滤异常请求，并返回提示
 *
 * @name:MyHttpFilter
 * @description:二、定义一个异常处理过滤器
 * 场景：和情形一互补，是在有请求异常时，过滤异常请求，并返回提示
 * 1.定义http请求过滤器，继承自接口ExceptionFilter;注意：这里不再使用@Injectable()装饰器，而是使用@Catch()
 * 2.实现里面的catch方法
 * 3.同样在main.ts中注册
 * app.useGlobalFilters(new MyHttpFilter())
 *
 * 测试：
 * 在浏览器输入一个请求：
 * http://localhost:3000/baba
 * 就可以返回错误对象：
 * {
 *   "data": "Cannot GET /baba",
 *   "time": "2024-08-25T22:07:51.830Z",
 *   "success": false,
 *   "path": "/baba",
 *   "status": 404
 * }
 *
 *
 * @description:管道的使用
 * 三、管道pipe
 * 管道做两件事：
 * 数据转换+数据校验
 *
 * 3.1 数据类型转换
 * 内置八个类型转换API
 * ValidationPipe
 *
 * ParseIntPipe
 * ParseFloatPipe
 * ParseBoolPipe
 * PareArrayPipe
 * ParseEnumPipe
 *
 * ParseUUIDPipe
 *
 * DefaultValuePipe
 *
 *
 * 比如：user中
 * http://localhost:3000/user/:id
 *
 * http://localhost:3000/user/123
 * 获取这个动态参数123，打印其类型，为string；但后端需要一个number,此时就可以用管道来做转换
 *
 * 3.2 类型校验-在login模块中测试
 * 3.2.1 在项目目录下，生成一个crud资源
 * nest g res login
 * 3.2.2 使用命令 nest g pi login 生成一个管道文件，同名时，生成后自动归并到同一文件夹下
 *
 * 3.3.3 把管道类名放到@Body()装饰器里
 * 发请求：
 * http://localhost:3000/login
 * body参数
 * {
 *     "name": "张红",
 *     "ag": 18
 * }
 *
 * 3.3.4 控制台中，打印管道类文件中的参数对象value值和metadata元数据
 * {name:'张红'，age: 18}
 * { metatype: [class CreateLoginDto], type: 'body', data: undefined }
 * 说明：
 * a. data键：是@Body()装饰器中传入的第一个用于解构的参数名，例如：@Body('name',LoginPipe) ,
 * 这个data就是name;不传默认为undefined
 *
 * b. metatype键：里可以读取到DTO类，用于数据校验
 *
 * 3.3.5 login.controller文件中，将目标转向路由里的dto参数类CreateLoginDto
 * create(@Body(LoginPipe) createLoginDto: CreateLoginDto) {
 *
 * 3.3.6 安装包class-validator和class-transformer,并引入
 * 3.3.7 在DTO类中以装饰器的形式，添加验证规则
 * 3.3.8 管理文件夹中，使用反射机制，使用plainToInstance(metadata.metatype,value);实例化DTO对象
 * 3.3.9 DTO对象，作为参数const errors=await validate(DTO);
 * 3.3.10 返回异常对象errors，errors空数组，正常返回值value;否则抛出new HttpException(errors,HttpStatus.BAD_REQUEST)异常
 * 3.3.11 在main.ts中，全局注册管道
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * */