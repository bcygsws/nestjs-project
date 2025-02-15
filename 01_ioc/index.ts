/**
 * @desc:控制反转和依赖注入
 * IoC：Inversion of Control，控制反转
 * DI：Dependency Injection，依赖注入
 * 举例依赖注入
 * 控制反转：是使用IoC容器来管理对象的生命周期、 依赖关系，从而使应用程序的配置和依赖规范性和应用程序的实际代码分离
 * @author: Bao Chengyi
 *
 * */

// 被依赖的类A
class A {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

// 被依赖的类C
class C {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

// IoC容器
class Container {
    module: any;

    constructor() {
        this.module = {};
    }

    provider(key: string, value: any) {
        this.module[key] = value;
    }

    get(key: string) {
        return this.module[key];
    }

}

const container = new Container();
// 往容器中注册A类和C类
container.provider('a', new A("小满1"));
container.provider('c', new C("小满2"));

// B类依赖A类和C类，但使用Container来注入，而不是new A()，new C()
// B类将依赖关系的管理权交给其他的类Container
class B {
    a: any;
    c: any;

    constructor(container: Container) {
        this.a = container.get('a');
        this.c = container.get('c');
    }
}

//  B实例创建后，就可以根据注入的container,来访问A类和C类的成员和方法
new B(container);
// 使用命令执行：ts-node .\index.ts

// 执行结果：
// A { name: '小满1' }
// C { name: '小满2' }
console.log(new B(container).a);
console.log(new B(container).c);