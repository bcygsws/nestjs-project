/**
 * @desc：四种类型注解
 * ClassDecorator: 类装饰器
 * PropertyDecorator: 属性装饰器
 * MethodDecorator: 方法装饰器
 * ParameterDecorator: 参数装饰器
 *
 *
 * 注：使用装饰器时，tsconfig.json中必须设置"experimentalDecorators": true
 *
 * 注2：使用tsc --build，编译出错;是没有设置 experimentalDecorators：true
 * 可以直接使用ts-node执行当前文件
 *
 * @author：Bao Chengyi
 *
 * */
// a.定义一个类装饰器doc
// 参数：target类对象
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// const cls_doc: ClassDecorator = (target: any) => {
//     console.log(target);
//     // 在不破坏类的前提下，原型链上为类添加一个name属性
//     target.prototype.name = '小明';
//
// }
//
// @cls_doc
// class XiaoMan {
//     constructor() {
//     }
//
// }
//
// const m: any = new XiaoMan();
// console.log(m.name);
/*
* @desc:类装饰器结果
* 使用命令执行：
* ts-node .\index.ts
*
* [class XiaoMan]
* 小明
*
* */
// b.定义一个属性装饰器doc
// 参数：target类对象，key：属性名
// const Pro: PropertyDecorator = (target: any, key: any) => {
//     console.log(target);
//     console.log(key);
// }
//
// class XiaoHong {
//     @Pro
//     public gender: string;
//
//     constructor() {
//         this.gender = 'Male';
//     }
// }
//
// const xh: any = new XiaoHong();
// 命令执行：ts-node .\index.ts
/**
 * {}
 * gender
 *
 * */
// c.定义一个方法装饰器doc
// 参数说明：target类对象，key：方法名，descriptor：参数描述
// const doc: MethodDecorator = (target: any, key: string | symbol, descriptor: any) => {
//     console.log(target);
//     console.log(key);
//     console.log(descriptor);
// }
//
// class XiaoJun {
//     public name: string;
//
//     constructor() {
//         this.name = '小军';
//     }
//
//     @doc
//     public getName(): string {
//         return this.name;
//     }
// }
//
// const xj = new XiaoJun();
// 使用命令：ts-node .\index.ts
/**
 *@desc:方法装饰器执行结果
 * {}
 * getName
 * {
 * value: [Function: getName],
 * writable: true,
 * enumerable: false,
 * configurable: true
 *
 * }
 *
 *
 * */
// d.定义一个参数装饰器
// 参数说明：target类对象，key：方法名，index：参数索引
const doc = (target, key, index) => {
    console.log(target);
    console.log(key);
    console.log(index);
};
class XiaoBao {
    constructor() {
        this.name = '小宝';
    }
    getName(age, name) {
        return this.name + age;
    }
}
__decorate([
    __param(1, doc)
], XiaoBao.prototype, "getName", null);
const xb = new XiaoBao();
/**
 * @desc:使用命令执行：ts-node .\index.ts
 * {}
 * getName
 * 1
 *
 * */
