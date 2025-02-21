import {$http} from "@/utils";

/**
 * @desc：图片下载相关接口
 * 注意：responseType必须设置成'blob'或者'arraybuffer'
 * 已经在utils/http.ts中请求拦截器中统一设置，此处不再设置
 * */
const downloadImgAPI = () => {
    return $http.request({
        method: 'get',
        url: '/api/download/img'
    })
}
const downloadStreamAPI = () => {
    return $http.request({
        method: 'get',
        url: '/api/download/stream'
    })
}
export {
    downloadImgAPI,
    downloadStreamAPI
}