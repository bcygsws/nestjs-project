"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
 *
 *
 * */
const axios_1 = __importDefault(require("axios"));
// 带参数的方法装饰器 例如：@Get(url)
// const URL = 'http://123.207.32.32:8000/home/multidata';
function Get(url) {
    return function (target, propertyKey, descriptor) {
        console.log("decorator", descriptor);
        const func = descriptor.value;
        axios_1.default.get(url).then((res) => {
            func(res, { status: 200 }); // 调用方法
        }).catch((e) => {
            func(e, { status: 500 }); // 调用方法
        });
    };
}
class XiaoMan {
    constructor() {
    }
    // 实现了一个带参数的方法装饰器
    getData(res, status) {
        console.log("res===", res);
        console.log("res.data===", res.data);
        console.log("res.data.data===", res.data.data);
        console.log("status===", status);
    }
}
__decorate([
    Get('http://123.207.32.32:8000/home/multidata')
], XiaoMan.prototype, "getData", null);
const xm = new XiaoMan();
