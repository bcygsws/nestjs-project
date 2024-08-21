/**
 * @类装饰器
 * 是一个函数，类型注解为ClassDecorator
 *
 * ts-node  .\index.ts
 * 执行该ts文件，ts-node工具全局安装
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
const doc: ClassDecorator = (target: any) => {
    console.log(target);// target打印类名
    // 为此类添加属性，如同：class 定义类，声明属性一样
    target.prototype.name = "魏无忌";

}

// 定义类
/**
 * @doc的作用
 * 等价于
 * doc(XiaoMan);
 *
 * */
@doc
class XiaoMan {
    constructor() {
    }
}

// doc(XiaoMan);

const xm: any = new XiaoMan();
console.log(xm.name);
/*
[class XiaoMan]
魏无忌

*/