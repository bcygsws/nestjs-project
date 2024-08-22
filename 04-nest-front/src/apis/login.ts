// import ResType from "@/apis/shared";
import $http from "@/utils/http";


// 1.获取验证码API
// 在vite.config.ts文件中配置代理

// const getCaptchaAPI = () => {
//     return $http.request<ResType<any>>({
//         method: 'GET',
//         url: '/api/login/code'
//     });
// }
// 提交接口
export interface IForm {
    admin: string
    pwd: string
    checkPass: string
}

const submitLoginAPI = (val: IForm) => {
    console.log(val);
    return $http.request({
        method: 'POST',
        url: '/api/login/create',
        data: val
    })

}
export {
    // getCaptchaAPI,
    submitLoginAPI
}