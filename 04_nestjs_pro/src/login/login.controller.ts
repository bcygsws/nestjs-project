import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Session} from '@nestjs/common';
import {LoginService} from './login.service';
import {CreateLoginDto} from './dto/create-login.dto';
import {UpdateLoginDto} from './dto/update-login.dto';
import * as svgCaptcha from 'svg-captcha';

/**
 * @nestjs使用session
 * 1.装包
 * npm i express-session -D
 * 为了获得语法提示，也安装一下express-session的类型声明包
 * npm i @types/express-session -D
 *
 * 2.安装svg-captcha
 *
 *
 * */
@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {
    }

    // 1.get方式:每次进入登录界面，请求一个验证码
    // 请求url：http://localhost:3000/login/code
    // 可选查询参数：http://localhost:3000/login/code?随机数或时间戳，重新请求
    // 注：和路由参数一样，session既可以从req中获取，也可以使用@Session()装饰器来获取
    @Get('code')
    createCode(@Res() res, @Session() session) {
        // 打印一下req,查看注册过来的session
        // console.log(req);
        console.log(session);
        // create方法生成验证码
        const captcha = svgCaptcha.create({
            size: 4, // 验证码有几位字符
            fontSize: 50, // 字符大小
            width: 100, // 宽度
            height: 30, // 高度
            background: '#cc9966' // 背景颜色

        });
        console.log(captcha);// captcha对象：{text:'xFjM',data:'<svg xmlns="">'}
        // 1.将生成的验证码文本传给session
        session.code = captcha.text;
        // console.log("test", session.code);
        // 2.设置响应数据类型，给页面返回一张图片
        res.type('image/svg+xml');
        // 2.给页面返回一张图片
        /**
         * 注意：
         * 由于页面渲染时，img标签src在得到路径后，会
         * 发送请求；为了使得:src="codeUrl"双引号中直接得到图片，
         * res.send(直接返这个图片，不添加额外的code或message值)
         *
         * */
        res.send(captcha.data);// <svg xmlns=""></svg>是图片文件
    }

    /**
     * 2.登录信息验证
     * 2.1 请求方式：post
     * 2.2 请求url：http://localhost:3000/login/create
     *
     * 2.3 body参数:三个必要参数
     * admin string类型
     * pwd string类型
     * checkPass string类型
     *
     *
     * */
    @Post('create')
    createLogin(@Body('checkPass') checkPass: string, @Res() res, @Session() session) {
        console.log(session);
        if (session.code.toLowerCase() === checkPass.toLowerCase()) {
            res.send({
                code: 200,
                message: '恭喜你，登录成功！'
            });

        } else {
            res.send({
                code: 401,
                message: '很遗憾，登录信息验证失败！'
            })
        }

    }

    @Post()
    create(@Body() createLoginDto: CreateLoginDto) {
        return this.loginService.create(createLoginDto);
    }

    @Get()
    findAll() {
        return this.loginService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.loginService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
        return this.loginService.update(+id, updateLoginDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.loginService.remove(+id);
    }
}
