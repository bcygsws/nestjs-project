/**
 * @name:http.ts
 * @desc:token过期，无感刷新
 * 方式一
 * 参考文档：https://www.bilibili.com/video/BV1zM411c7h6/?spm_id_from=333.788&vd_source=2806005ba784a40cae4906d632a64bd6
 *
 * */

import axios from 'axios';
import useTokenStore from "@/store";
import router from "@/router";

const $http = axios.create({
    baseURL: '',// 在vite配置文件中，已经设置了代理，此处不必写
    timeout: 5000
});
$http.interceptors.request.use(config => {
    // 这里调用pinia的钩子，需要在函数内部-局部调用，否则报错：Uncaught Error: []: “getActivePinia()“ was called but there was no active Pinia
    const token = useTokenStore().getAccessToken;
    console.log('test===', token);
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 刷新token
// isFresh:否正在刷新token的标识
let isFresh = false;
let PromiseRF: Promise<any>;
const refreshToken = () => {
    // 1.从pinia中获取更新token,refreshToken
    const refreshToken = useTokenStore().getRefreshToken;
    if (!refreshToken) {
        return Promise.reject("refresh_token is empty");
    }
    // 2.阻断其他失败请求，再次请求刷新
    if (isFresh) {
        return PromiseRF;
    }
    // 3.isFresh置为true，表示正在刷新token；正在刷新时，此时由于isFresh为true，经过上面的分支时，其他刷新token的请求被阻断
    isFresh = true;
    // 4.发送刷新token的请求
    PromiseRF = $http.get('/api/refresh_token', {params: {refreshToken: refreshToken}})
        .finally(() => isFresh = false);// 无论如何isFresh在Promise执行后，都置为false
    return PromiseRF;


};


$http.interceptors.response.use(res => {
    return res;
}, async error => {
    console.log("error===", error);
    const {data, config} = error.response;
    const tokenStore = useTokenStore();

    // 如果是登录过期并且请求的地址不是 /refresh_token，就调用refreshToken
    // if (data.statusCode === 401 && config.url !== "/api/refresh_token") {
    if (data.statusCode === 401 && config.url !== "/api/refresh_token") {
        console.log('----我执行了吗');
        try {
            const res = await refreshToken();
            tokenStore.saveAccessToken(res.data['access_token']);
            tokenStore.saveRefreshToken(res.data['refresh_token']);

            return $http(config);
        } catch (e) {
            // refreshToken失败，跳转到登录页
            console.log(e);
            await router.push("/");
            return;
        }
    }
    return Promise.reject(error);

});
export default $http;