/**
 * @使用 依赖注入 的写法
 *
 * 笔记：
 * 1.依赖注入是一种 控制反转技术-IoC
 *
 *
 *
 * */
class A {
    constructor(name) {
        this.name = name;
    }
}
class C {
    constructor(name) {
        this.name = name;
    }
}
// 1.定义一个容器类 provide/get方法
class Container {
    constructor() {
        // 依赖注入前，空值
        this.mo = {};
    }
    // 容器类的provide方法 注入依赖
    provide(key, mo) {
        this.mo[key] = mo;
    }
    // 容器类的方法，获取值
    get(key) {
        return this.mo[key];
    }
}
// 2.实例化一个容器类，并注入类
const ct = new Container();
ct.provide('a', new A("hahahahwagg"));
ct.provide('c', new C('AFGHGAGG'));
class B {
    constructor(mo) {
        this.a = mo.get('a');
        this.c = mo.get('c');
    }
    getValue() {
        console.log(this.a);
        console.log("---------");
        console.log(this.c);
    }
}
// 依赖注入到了实例ct所指向的类了，那么要取值时，B中也需要传递这个实例对象
const b = new B(ct);
b.getValue();
