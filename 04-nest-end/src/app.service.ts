import {Injectable} from '@nestjs/common';
import * as SVGCaptcha from 'svg-captcha';
/**
 * @nestjs使用session
 * 1.装包
 * npm i express-session -D
 * 为了获得语法提示，也安装一下express-session的类型声明包
 * npm i @types/express-session -D
 *
 * 2.安装svg-captcha
 * 2.1.将生成的验证码文本传给session
 *  session.code = captcha.text;
 *  console.log("test", session.code);
 * 2.2.设置响应数据类型，给页面返回一张图片
 * res.type('image/svg+xml');
 * 2.3.给页面返回一张图片
 *  注意：
 * 由于页面渲染时，img标签src在得到路径后，会
 * 发送请求；为了使得:src="codeUrl"双引号中直接得到图片，
 *res.send(直接返这个图片，不添加额外的code或message值)
 */

@Injectable()
export class AppService {

    getCaptcha(res, session) {
        // console.log(session);
        const captcha = SVGCaptcha.create({
            size: 4, // 验证码有几位字符
            fontSize: 50, // 字符大小
            width: 100, // 宽度
            height: 35, // 高度
            background: '#f1f5f8', // 背景颜色
            noise: Math.floor(Math.random() * 3),// 干扰线条数，0，1,2条
            color: true,// 设置验证码字符有颜色
            ignoreChars: '0oli' // 忽略容易混淆的字符
        });
        console.log(captcha);// captcha对象：{text:'xFjM',data:'<svg xmlns="">'}
        session.code = captcha.text;
        res.type('image/svg+xml');
        res.send(captcha.data);
    }

    getHello(): string {
        return 'Hello World!';
    }
}
