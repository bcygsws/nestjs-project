import axios from 'axios';

// 这里不使用代理，直接后端处理跨域
const $http = axios.create({
    baseURL: 'http://localhost:3000/',// 后端接口的域名
    timeout: 5000// 超时时间设定为5s
});
// 请求拦截器
$http.interceptors.request.use(config => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 响应拦截器
$http.interceptors.response.use(res => {
    return res;
}, (err) => {
    return Promise.reject(err);
})

export default $http;