/**
 * @ 02属性装饰器
 * 是一个函数，类型注解为ClassDecorator
 *
 * ts-node  .\index.ts
 * 执行该ts文件，ts-node工具全局安装
 *
 * 类装饰器的语法：
 * 1.声明一个类型注解为ClassDecorator的函数
 * 2. @装饰器名 置于需要传入的类上方
 *
 * 装饰器：
 * 定义：是结构型设计模式之一，优于继承、用于解耦
 *
 *
 * */
// const doc: PropertyDecorator = (target: any, propertyKey: string | symbol) => {
//     console.log(target);// {}
//     console.log(propertyKey);// name
//
// }
//
// // 02.定义属性装饰器
// /**
//  * @doc的作用
//  * 等价于
//  * doc(XiaoMan);
//  *
//  * @doc这样做的好处：就可以在不破坏类 XiaoMan的情况下，添加一些属性
//  *
//  * */
// class XiaoMan {
//     @doc
//     name: string
//
//     constructor() {
//         this.name = "马千红";
//     }
// }
//
// // doc(XiaoMan);
//
// const xm: any = new XiaoMan();
/*
打印结果：
{}
name
* */


// ------分割线------


// 3.定义方法装饰器
// 在属性装饰器的基础上，又增加了第三参数：descriptor，它表示一个描述符对象（具体看ts-node运行后的结果）
// const doc: MethodDecorator = (target: any, propertyKey: string | symbol, descriptor: any) => {
//     console.log(target);// {}
//     console.log(propertyKey);// name
//     console.log(descriptor);
//
// }
//
// /**
//  * @doc的作用
//  * 等价于
//  * doc(XiaoMan);
//  *
//  * @doc这样做的好处：就可以在不破坏类 XiaoMan的情况下，添加一些属性
//  *
//  * */
// class XiaoMan {
//     name: string
//
//     constructor() {
//         this.name = "马千红";
//     }
//
//     @doc
//     getName() {
//         console.log(this.name);
//     }
// }
// const xm: any = new XiaoMan()

// doc(XiaoMan);

/*
方法装饰器打印内容：
{}
getName
{
  value: [Function: getName],
  writable: true,
  enumerable: false,
  configurable: true
}

* */


// 4.定义参数装饰器
// 在属性装饰器的基础上，又增加了第三参数：index，它表示一个索引,第几个参数添加了装饰器（具体看ts-node运行后的结果）
const doc: ParameterDecorator = (target: any, propertyKey: string | symbol, index: number) => {
    console.log(target);// {}
    console.log(propertyKey);// name
    console.log(index);

}

/**
 * @doc的作用
 * 等价于
 * doc(XiaoMan);
 *
 * @doc这样做的好处：就可以在不破坏类 XiaoMan的情况下，添加一些属性
 *
 * */
class XiaoMan {
    name: string

    constructor() {
        this.name = "马千红";
    }

    getName(name: string, @doc age: number) {
        console.log(this.name);
    }
}

// doc(XiaoMan);

const xm: any = new XiaoMan()
/*
参数装饰器打印内容：
{}
getName
1
* */