/**
 * @装饰器的应用
 * 需求：使用 装饰器封装一个get请求的服务，拿到请求列表
 * 可用的get请求接口：http://123.207.32.32:8000/home/multidata
 *
 * bug:浏览器目前还不能识别exports,打包成的js文件报错：Uncaught ReferenceError: exports is not defined
 * 解决：
 * 使用webpack打包，将ts文件转译
 * 参考文档：
 * https://blog.csdn.net/weixin_44972008/article/details/121639173
 *
 *
 *
 *
 * */
import axios from "axios";
// 1.声明一个方法装饰器
const Get = (url: string): MethodDecorator => {
    return (target, propertyKey, descriptor: PropertyDescriptor) => {
        console.log(descriptor);
        console.log(descriptor.value);
        const func = descriptor.value;
        axios.get(url).then((res) => {
            func(res, {status: 200})
        }).catch((e) => {
            func(e, {status: 500})
        })


    }
}

// 定义控制器
class ListController {
    constructor() {
    }

    // 获取列表
    @Get('http://123.207.32.32:8000/home/multidata')
    getList(res: any, code: any) {
        // console.log(res.data);
        // console.log(res.data.data);
        // console.log(res.data.data['banner']);
        console.log(res.data.data['banner'].list);
        console.log("code:", code);
    }
}