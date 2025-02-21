/**
 * @dsc:nest-cli脚手架生成的项目，rxjs包是默认安装的，所以不需要再安装
 * 此处，单独安装了rxjs
 * 1.生成package.json文件，npm init -y
 * 2.生成ts配置文件，tsc --init,生成tsconfig.json文件
 * 配置几处：
 * outDir: "./js"
 * strict: false
 *
 * 3.装包rxjs
 * npm i rxjs --save
 *
 * RxJs使用观察者模式，用来编写异步队列和事件处理
 *
 * 案例1：index.ts 演示Observable
 *
 *
 * */
import {Observable} from 'rxjs';
// Observable类似于迭代器，next发出通知；complete完成
const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();// 执行后，后面的next()不会执行了
        subscriber.next(5);
    }, 3000);
});
// 在控制台使用subscribe订阅；在控制台输出1，2，3，4
// 注：其中4是（停顿3s后输出4）
/**
 * 监听时，是一个next键的对象
 * observable.subscribe({
 *    next:(val)=>{
 *     console.log(val);
 *    }
 * })
 *
 * */
observable.subscribe({
    next: (value) => {
        console.log(value);
    }
});

// ts-node执行当前index.ts文件
// 命令：ts-node index.ts