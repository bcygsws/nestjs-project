import axios from 'axios';

const $http = axios.create({
    baseURL: '',// 在vite配置文件中，已经设置了代理，此处不必写
    timeout: 5000
});
$http.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});
$http.interceptors.response.use(res => {
    return res;
}, error => {
    return Promise.reject(error);
});
export default $http;