/*
 * @Description:
 * @Version:
 * @Author: bcygsws@163.com
 * @Date: 2024-08-20 22:42:51
 * @LastEditors: Bao Chengyi
 * @LastEditTime: 2024-08-20 22:43:08
 * @FilePath: \02_体验ts自动编译e:\nestjs-project\ioc\ioc.ts
 */
class A {
	name: string;
	constructor() {
		this.name = '小满';
	}
}
class B {
	b: any;
	constructor() {
		this.b = new A().name;
	}
}
class C {
	b: any;
	constructor() {
		this.b = new A().name;
	}
}
