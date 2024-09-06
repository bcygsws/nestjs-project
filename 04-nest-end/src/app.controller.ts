import {Body, CanActivate, Controller, Get, Param, Post, Query, Req, Res, Session, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from "@nestjs/passport/dist/auth.guard";
import {AuthService} from "./auth/auth.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private authService: AuthService) {
    }

    @Get('captcha')
    getCaptcha(@Res() response, @Session() session) {
        return this.appService.getCaptcha(response, session);

    }

    /**
     * @name:/login登录接口返回Bearer Token + 测试接口：/profile 在请求头中携带token访问后端接口
     * @desc:
     * 守卫执行时机：我们知道，它在中间件之后，拦截和管道之前执行
     * 守卫：是根据运行时出现的指定条件（权限、角色和控制列表等），来确定给定的请求是否由路由程序处理
     * 参考：https://xiaoman.blog.csdn.net/article/details/127175529
     *
     * 1.登录返回token接口
     * http://localhost:3000/login
     * post方式
     * body参数，格式：{username:'',password:'',checkPass:''}
     *
     * 2.模拟携带token访问后端请求
     * http://localhost:3000/profile
     * get方式
     * 参数有两种添加方式：
     * 一、常用headers--->Authorization--->输入带Bearer的token:例如：
     * Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJpYXQiOjE3MjU0ODU3MjQsImV4cCI6MTcyNTQ5MjkyNH0.Qd0V3gAsrf2Zkowpokq5rr_VtjK7
     * sjmtM4V0D7K6dm4
     *
     * 二、直接验证Auth--->选中类型为 Bearer Token--->参数值此时就不带Bearer,例如：
     * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJpYXQiOjE3MjU0ODU3MjQsImV4cCI6MTcyNTQ5MjkyNH0.Qd0V3gAsrf2Zkowpokq5rr_VtjK7
     * sjmtM4V0D7K6dm4
     * auth: 类型为Bearer token
     *
     * 3.token过期重新请求token
     * 参考：https://www.bilibili.com/video/BV1zM411c7h6/?spm_id_from=pageDriver&vd_source=2806005ba784a40cae4906d632a64bd6
     *
     *
     * */

    @UseGuards(AuthGuard('local') as CanActivate | Function)
    @Post('login')
    doLogin(@Req() request: Request, @Session() session, @Body('checkPass') checkPass: any) {
        console.log(typeof checkPass);
        // request={username:'',password:''}
        // passport会根据validate()方法的返回值，创建一个user对象；并以request.user的形式分配给请求对象

        // 第一步：本地策略-测试用户名和密码时，用到
        // return request['user'];
        // 第二步：返回token给前端
        // 第三步：验证码验证
        console.log(session.code);
        if (session.code && checkPass.toLowerCase() === session.code.toLowerCase()) {
            return this.authService.login(request['user']);

        }
        return {
            code: 501,
            message: '验证码错误'
        }

    }

    // 2.token过期重新请求token
    /**
     * token过期重新请求token
     * 请求方式：GET
     * url地址: localhost:3000/refresh_token?refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmF
     *
     * 参考：双token无感刷新
     * https://juejin.cn/post/7363193808521379879
     *
     *
     *
     *
     *
     * */
    @Get('refresh_token')
    refreshToken(@Req() request: Request, @Query('refreshToken') refreshToken: string) {
        return this.authService.refreshToken(refreshToken);
    }

    // 3.测试接口-携带token访问后端接口

    @UseGuards(AuthGuard('jwt') as CanActivate | Function)
    @Get('profile')
    doProfile(@Req() request: Request) {
        // console.log(request);
        // console.log("test===", request.headers);
        // console.log("token===", request.headers['authorization']);
        return request['user'];
    }

    @UseGuards(AuthGuard('jwt') as CanActivate | Function)
    @Get('test')
    getHello() {
        return this.appService.getHello();
    }
}
