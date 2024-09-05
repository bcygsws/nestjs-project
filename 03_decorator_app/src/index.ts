/**
 *
 * @name:方法装饰器的应用
 * @description:使用方法装饰器模拟controller层的@Get()方法装饰器
 * 接口地址：http://123.207.32.32:8000/home/multidata
 *
 * 步骤：
 * 1.tsc --init 生成ts.config.json文件
 * npm init -y 生成package.json文件，方便后续安装包axios
 *
 * 2.编写类ListController
 * 3.编写返回响应内容和status的方法getList
 * 4.定义一个方法装饰器Get，需要传参url;返回这个方法装饰器
 * 5.new ListController实例化对象，使得getList调用
 *
 *
 *
 * */
// 要传入URL,多一层函数用以传参
// const URL = 'http://123.207.32.32:8000/home/multidata';

import axios from "axios";

const Get = (url: string): MethodDecorator => {
    return (target, propertyKey, descriptor: PropertyDescriptor) => {
        console.log(descriptor);
        // 获取返回相应内容的那个方法名称
        const func = descriptor.value;
        axios.get(url).then((res) => {
            func(res, {code: 200});
        }).catch((err) => {
            func(err, {code: 500});
        })

    }
}


// 定义返回响应内容的方法getList
class ListController {
    constructor() {
    }

    @Get('http://123.207.32.32:8000/home/multidata')
    // code类型断言：{ code: number }；res实际开发中，根据接口的数据接口断言
    // 返回参数res和code的类型是any
    getList(res: any, code: { code: number }) {
        console.log("res.data===", res.data);
        console.log("code===", code);


    }

}

const listController = new ListController();