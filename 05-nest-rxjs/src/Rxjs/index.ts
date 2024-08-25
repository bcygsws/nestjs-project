/**
 * @name:index.ts
 * @description: Rxjs的使用
 * 使用nest脚手架的项目演示的原因:
 * 该脚手架创建的项目自动安装了 "rxjs": "^7.8.1"
 * 1.目的：RxJs是用来编写异步队列和事件处理
 * 2.Observable 可观察的物体
 * 类似Redux的东西
 * 3.使用ts-node执行当前index.ts文件
 * 命令：
 * ts-node ./src/Rxjs/index
 *
 * 4.rxjs的API有100多个
 *
 *
 *
 *
 *
 * */
import {Observable, of, interval, take, retry, fromEvent} from "rxjs";
// 类似数组的操作方法,放在pipe()管道方法中，使用各种不同的方式处理数据
import {filter, map, findIndex, reduce} from "rxjs/operators";
// 一、观察者Observable
// const observable = new Observable((subscribe) => {
//     subscribe.next(1);
//     subscribe.next(2);
//     subscribe.next(3);
//     // 也支持异步
//     setTimeout(() => {
//         subscribe.next(4)
//         subscribe.complete();// 结束
//     }, 3000);
// });
//
// // 拿到这个值，先是1 2 3 ,停顿3s后，输出4
// observable.subscribe(val => {
//     console.log(val);
// })

// 二、rxjs更高级的应用

// 2.1 从0开始每隔500ms打印一个数字，take设定总数是5个，subscribe方法的回调拿到值
// interval(500).pipe(take(5)).subscribe(value => {
//     console.log("打印：" + value);
// })

// 2.2 也可以使用map将数据转化为对象数组
// 功能：每隔500ms，打印一个{num:0}……{num:无限个}
// interval(500).pipe(map((item)=>({num:item}))).subscribe(val=>{
//     console.log(val);
// })

// 2.3 管道方法pipe()方法里面也可以传入多个操作数
// 功能：在2.2基础上，传入了一个过滤操作数，只保留num值为偶数的元素
// interval(500).pipe(
//     map((item) => ({num: item})),
//     filter((item) => item.num % 2 === 0)
// ).subscribe(val => {
//     console.log(val);
// })

// 2.4 更进一步，如何让这种无限操作停下来，使用接收值的unsubscribe()方法

// const sub = interval(500).pipe(
//     map(val => ({num: val})),
//     filter(val => val.num % 2 === 0)
// ).subscribe(e => {
//     console.log(e);
//     if (e.num === 10) {// 到num为10的时候，输出已经执行了，也是最后一次订阅这种观察者发布的内容
//         sub.unsubscribe();// 取消这种订阅
//     }
// })
/*
{ num: 0 }
{ num: 2 }
{ num: 4 }
{ num: 6 }
{ num: 8 }
{ num: 10 }


 */

// 2.5 不使用interval从0开始的连续整数，可以使用of自定义数据 of(1,2,3,4,5)
// const sub = of(1, 2, 3, 4, 5).pipe(
//     map(item => ({num: item})),
//     filter(item => item.num % 2 === 0)
// ).subscribe(e => {
//     console.log(e);
//     // if (e.num === 10) {// num值增加到10时，停止订阅这种变化
//     //     sub.unsubscribe();
//     // }
// })

/*
{ num: 2 }
{ num: 4 }

 */

// 2.6 retry的使用
// 场景：比如调用接口一次失败了，可以使用retry自动重试几次
const sub = of(1, 2, 3, 4, 5).pipe(
    retry(3),
    map(item => ({num: item})),
    filter(item => item.num % 2 === 0)
).subscribe(e => {
    console.log(e);
    // if (e.num === 10) {// num值增加到10时，停止订阅这种变化
    //     sub.unsubscribe();
    // }
})

// 2.7 操作dom，在nestjs中用不到，nestjs专注后端
// const clickHandler = fromEvent(document, 'click').pipe(map(v => v.target));
// clickHandler.subscribe(e => {
//     // 把事件传过来
//     console.log(e);
// })

