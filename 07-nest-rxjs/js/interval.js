"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @desc:案例2；演示interval
 * interval(500).map()
 * 表示每间隔500ms，执行一次map()方法
 *
 * */
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
// 1.每500ms，得到一个{num:递增数字}对象；
// 2.过滤掉奇数；
// 3.每次得到一个偶数，就打印出来；当数字为10时，取消订阅；
const sub = (0, rxjs_1.interval)(500).pipe((0, rxjs_1.map)(val => ({ num: val })), (0, operators_1.filter)((val) => val.num % 2 === 0)).subscribe(e => {
    console.log(e);
    if (e.num === 10) {
        sub.unsubscribe(); //
    }
});
