import axios from 'axios';

const $http = axios.create({
    baseURL: 'http://localhost:5173/',
    timeout: 5000
})
$http.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err);
})
$http.interceptors.response.use(res => {
    return res.data;
}, err => {
    return Promise.reject(err);
});
export default $http;