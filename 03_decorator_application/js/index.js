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
const axios_1 = __importDefault(require("axios"));
// 1.声明一个方法装饰器
const Get = (url) => {
    return (target, propertyKey, descriptor) => {
        console.log(descriptor);
        console.log(descriptor.value);
        const func = descriptor.value;
        axios_1.default.get(url).then((res) => {
            func(res, { status: 200 });
        }).catch((e) => {
            func(e, { status: 500 });
        });
    };
};
// 定义控制器
class ListController {
    constructor() {
    }
    // 获取列表
    getList(res, code) {
        // console.log(res.data);
        // console.log(res.data.data);
        // console.log(res.data.data['banner']);
        console.log(res.data.data['banner'].list);
        console.log("code:", code);
    }
}
__decorate([
    Get('http://123.207.32.32:8000/home/multidata')
], ListController.prototype, "getList", null);
