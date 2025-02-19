/**
 * @desc:演示全局中间件函数
 *  中间件的白名单
 *  拦截/user请求，对白名单中的/list请求，不做任何修改
 *
 * */

// 定义一个全局中间件函数

const whitelist = ['/list'];

function globalMiddleware(req, res, next) {
// 全局中间件执行了
    console.log("全局中间件执行了");
    // console.log(req);
    console.log(req.originalUrl);
    if (whitelist.includes(req.originalUrl)) {// 是/list请求，全局中间件对请求不做修改,next()
        next();
    } else {
        // 非/list请求，做拦截 拦截后，返回一个响应
        // 在apifox中测试，返回是否为200
        res.send({code: 200, message: "中间件拦截了"});
    }
}

export default globalMiddleware;