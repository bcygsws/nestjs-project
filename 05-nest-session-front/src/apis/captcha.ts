import {$http} from "@/utils/index";

/**
 * @提交验证码post请求
 *
 * */
export interface ICode {
    user: string;
    pwd: string;
    code: string;
}

const submitCaptchaAPI = (data: ICode) => {
    return $http.request({
        method: 'POST',
        url: '/api/user/create',
        data,
        headers: {
            'content-type': 'application/json',
        }
    })
}
export {
    submitCaptchaAPI
}