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
    name: string

    constructor(name: string) {
        this.name = name;
    }
}

class C {
    name: string

    constructor(name: string) {
        this.name = name;
    }
}

// 1.定义一个容器类 provide/get方法
class Container {
    mo: any

    constructor() {
        // 依赖注入前，空值
        this.mo = {}
    }

    // 容器类的provide方法 注入依赖
    provide(key: string, mo: any) {
        this.mo[key] = mo;
    }

    // 容器类的方法，获取值
    get(key: string) {
        return this.mo[key];
    }
}

// 2.实例化一个容器类，并注入类
const ct = new Container();
ct.provide('a', new A("hahahahwagg"));
ct.provide('c', new C('AFGHGAGG'));

class B {
    a: any
    c: any

    constructor(mo: Container) {
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