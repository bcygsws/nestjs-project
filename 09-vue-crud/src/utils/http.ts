import axios from 'axios';

// 这里不适用代理，直接后端处理跨域
const $http = axios.create({
    baseURL: 'http://localhost:3000',// 后端接口的域名
    timeout: 5000// 超时时间设定为5s
})

export default $http;