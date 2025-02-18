/**
 * @desc：实现：使用方法装饰器写一个@Get请求装饰器
 * 项目构建过程
 * 1.新建项目03_method_decorator_app
 * 2.在src目录下新建index.ts文件
 * 3.项目根目录在终端代开，并执行tsc --init，生成tsconfig.json文件
 * 注：
 * strict:false
 * experimentalDecorators:true
 * outDir 配置生成的对应js文件路径，也可以不配置
 *
 * 4.使用命令：npm init -y，生成package.json文件
 * 需要安装axios包
 *
 * 5.安装axios：npm install axios --save
 * 6.准备配置工作完成，开始写index.ts代码
 * 7.在终端中执行ts文件
 * ts-node ./src/index.ts
 *
 *
 * */
import axios from "axios";

// 带参数的方法装饰器 例如：@Get(url)

// const URL = 'http://123.207.32.32:8000/home/multidata';
// 注：写成function Get()是方便传递参数，返回值为MethodDecorator类型，是一个方法装饰器

function Get(url: string): MethodDecorator {
    return function (target, propertyKey, descriptor: PropertyDescriptor) {
        console.log("decorator", descriptor);
        const func = descriptor.value;
        axios.get(url).then((res) => {
            func(res, {status: 200})// 调用方法
        }).catch((e) => {
            func(e, {status: 500})// 调用方法
        })
    }
}

class XiaoMan {
    constructor() {
    }

    // 实现了一个带参数的方法装饰器

    @Get('http://123.207.32.32:8000/home/multidata')
    getData(res: any, status: { status: number }) {
        console.log("res===", res);
        console.log("res.data===", res.data);
        console.log("res.data.data===", res.data.data);
        console.log("status===", status);
    }
}

// 实例化类，调用构造方法
const xm = new XiaoMan();
