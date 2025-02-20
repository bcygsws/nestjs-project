import axios from 'axios';

const $http = axios.create({
    timeout: 5000
});
// 请求拦截器
// axiso等在请求request里面添加responseType：'blob'
// 参考文档：https://juejin.cn/post/7442284498740527114
$http.interceptors.request.use(config => {
    console.log(config);
    if (config.url!.indexOf('/api/download/img') !== -1) {
        config.responseType = 'blob';
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});

// 响应拦截器
$http.interceptors.response.use(res => {
    return res;
}, (err) => {
    return Promise.reject(err);
});
export default $http;