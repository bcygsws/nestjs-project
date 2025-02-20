import {$http} from "@/utils";

/**
 * @desc：图片下载相关接口
 *
 *
 *
 * */
const downloadImgAPI = () => {
    return $http.request({
        method: 'get',
        url: '/api/download/img'
    })
}
export {
    downloadImgAPI
}