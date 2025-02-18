var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @类装饰器
 * 是一个函数，类型注解为ClassDecorator
 *
 * ts-node  .\index.ts
 * 执行该ts文件，ts-node工具全局安装
 *
 * ts两类命令：
 * ts-node 执行ts文件
 *
 * tsc工具创建配置配置、构建和监听
 * tsc --init
 * tsc--build
 * tsc --watch
 *
 * 类装饰器的语法：
 * 1.声明一个类型注解为ClassDecorator的函数
 * 2. @装饰器名 置于需要传入的类上方
 *
 * 扩展
 * 装饰器分为四种，函数类型注解，并记住各自的装饰器函数的参数
 * 类装饰器 :ClassDecorator
 * 属性装饰器 :PropertyDecorator
 * 方法装饰器 :MethodDecorator
 * 参数装饰器 :ParameterDecorator
 *
 *
 * */
const doc = (target) => {
    console.log(target); // target打印类名
    // 为此类添加属性，如同：class 定义类，声明属性一样
    target.prototype.name = "魏无忌11";
};
// 定义类
/**
 * @doc的作用
 * 等价于
 * doc(XiaoMan);
 *
 * */
let XiaoMan = class XiaoMan {
    constructor() {
    }
};
XiaoMan = __decorate([
    doc
], XiaoMan);
// doc(XiaoMan);
const xm = new XiaoMan();
console.log(xm.name);
/*
[class XiaoMan]
魏无忌

*/ 
