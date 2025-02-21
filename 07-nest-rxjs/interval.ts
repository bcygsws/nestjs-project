/**
 * @desc:案例2；演示interval
 * interval(500).map()
 * 表示每间隔500ms，执行一次map()方法
 *
 * */
import {interval, map, of, retry} from 'rxjs';
// 注：operators有100多个；光标移动到operators，按住ctrl键，点击，就可以查看源码中的所有operators
// 可以看到，map()方法，属于operators；
import {filter, take} from "rxjs/operators";
// 1.每500ms，得到一个{num:递增数字}对象；
// 2.过滤掉奇数；
// 3.每次得到一个偶数，就打印出来；当数字为10时，取消订阅；
// pipe(操作数1,操作数2) 每1000ms，执行完操作数1，再执行操作数2

// const sub = interval(1000).pipe(map(val => ({num: val})), filter((val) => val.num % 2 === 0)).subscribe(e => {
//     console.log(e);
//     if (e.num === 10) {
//         sub.unsubscribe();// 输出10时，取消订阅；跳出这个循环
//     }
// });

// 例：操作数take；从0开始，输出连续5个整数，不包括5
// interval(1000).pipe(take(5)).subscribe(e => {
//     console.log(e);// 打印：0 1 2 3 4
// });

// 例：自定义数据源
// 上面interval(时间间隔)都是默认数据源，从0开始也可以使用of()自定义数据源
// of(1, 2, 3, 4, 5, 6).pipe(map(e => ({num: e})), filter((val) => val.num % 2 === 0)).subscribe(val => {
//     console.log(val);
// })

// 例:使用retry()，重新请求；
// 假如of(1,2,3,4,5,6)是数据接口的话；请求失败，可以设置retry()，帮我们重新请求3次；
of(1, 2, 3, 4, 5, 6).pipe(retry(3), map(e => ({num: e})), filter((val) => val.num % 2 === 0)).subscribe(val => {
    console.log(val);
})
