import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    // 前端输入的验证码，后端验证
    // body参数格式：{user:'',pwd:'',code:''}
    @Post('create')
    create(@Body() body, @Req() req) {
        console.log("req.session===", req.session);
        if (req.session?.code.toLowerCase() === body.code.toLowerCase()) {
            return {
                code: 200,
                message: '验证码正确'
            }
        } else {
            return {
                code: 400,
                message: '验证码错误'
            }
        }
    }

// 打开登录界面，生成随机验证码，get请求
    @Get('code')
    genCaptcha(@Req() req, @Res() res) {
        // console.log("req===", req);
        // console.log("res===", res);
        const captcha = svgCaptcha.create({
            size: 4,
            ignoreChars: '0o1i',// 忽略易混淆的字符
            noise: Math.random()*3,// 干扰线条数
            color: true,// 设置验证码字符有颜色
            width: 150,
            height: 40,
            fontSize: 40,
            background: '#f1f5f8' // 背景颜色
        });
        console.log(captcha);// captcha对象格式：{text:'xFjM',data:'<svg xmlns="">'}
        // 验证码的文本内容记录
        req.session.code = captcha.text;
        res.type('image/svg+xml');
        res.send(captcha.data);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto
    ) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}