import axios from 'axios';

const $http = axios.create({
    baseURL: '',// 在vite配置文件中，已经设置了代理，此处不必写
    timeout: 5000
});
export default $http;