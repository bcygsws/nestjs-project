/**
 * @name:http-1.ts
 * @desc:token过期，无感刷新
 * 方式二
 * 参考文档：https://juejin.cn/post/7363193808521379879#heading-14
 *
 * */

// import axios, {AxiosRequestConfig} from 'axios';
// import useTokenStore from "@/store";
// import router from "@/router";
//
// const $http = axios.create({
//     baseURL: '',// 在vite配置文件中，已经设置了代理，此处不必写
//     timeout: 5000
// });
// $http.interceptors.request.use(config => {
//     // 这里调用pinia的钩子，需要在函数内部-局部调用，否则报错：Uncaught Error: []: “getActivePinia()“ was called but there was no active Pinia
//     const token = useTokenStore().getAccessToken;
//     console.log('test===', token);
//     if (token) {
//         config.headers['Authorization'] = 'Bearer ' + token;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });
//
// // 刷新token
// const refreshToken = () => {
//     const refreshToken = useTokenStore().getRefreshToken;
//     if (!refreshToken) {
//         return Promise.reject("refresh_token is empty");
//     }
//
//     // 这里会等到并发的请求都执行完之后再执行
//     return $http.get('/api/refresh_token', {params: {refreshToken: refreshToken}});
//
// };
//
// interface PendingTask {
//     config: AxiosRequestConfig;
//     resolve: Function;
// }
//
// // 是否还需要刷新token的标识
// let refreshing = false;
// // 存储未完成的请求
// const task: PendingTask[] = [];
//
//
// $http.interceptors.response.use(res => {
//     return res;
// }, async error => {
//     console.log("error===", error);
//     const {data, config} = error.response;
//     const tokenStore = useTokenStore();
//     // 如果正在刷新token，则将失败的请求挂起,
//     // 存入task中等待刷新token完成在全部执行出来
//     if (refreshing) {
//         return new Promise((resolve) => {
//             task.push({
//                 config,
//                 resolve,
//             });
//         });
//     }
//
//     // 如果是登录过期并且请求的地址不是 /refresh_token，就调用refreshToken
//     // if (data.statusCode === 401 && config.url !== "/api/refresh_token") {
//     if (data.statusCode === 401 && config.url !== "/api/refresh_token") {
//         console.log('----我执行了吗');
//         // 此时需要刷新了
//         refreshing = true;
//         try {
//             const res = await refreshToken();
//             // refreshing值置为false;表示刷新token成功,阻断其他刷新请求，token过期重新刷新的行为
//             refreshing = false;
//
//             // 重新发送请求
//             task.forEach((item) => {
//                 item.resolve($http(item.config));
//             });
//
//
//             tokenStore.saveAccessToken(res.data['access_token']);
//             tokenStore.saveRefreshToken(res.data['refresh_token']);
//
//             return $http(config);
//         } catch (e) {
//             // refreshToken失败，跳转到登录页
//             console.log(e);
//             await router.push("/");
//             return;
//         }
//     }
//     return Promise.reject(error);
//
// });
// export default $http;