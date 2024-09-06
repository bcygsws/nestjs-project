import ResType from './shared';
import $http from "@/utils/http.ts";
// GET 请求后端图片下载接口-流方式
const getImgStreamAPI = (url: string) => {
    // 方式一，使用axios;需要配置responseType响应头类型为arraybuffer或者blob
    return $http.request({
        method: "GET",
        url: url,
        // responseType: 'arraybuffer'// 必须设置响应类型为arraybuffer或者blob,否则下载下来的zip文件，解压错误
        responseType: 'blob'// 必须设置响应类型为arraybuffer或者blob,否则下载下来的zip文件，解压错误
    });

    // 方式二：使用更直观的fetch，直接将res.json()改成res.arrayBuffer()
    // return  fetch(url).then(res=>res.arrayBuffer());


}

/**
 * @name: uploadSinImgAPI
 * @description: 上传单个文件接口
 * post方式
 *
 *
 * */
const uploadSinImgAPI = (data: FormData) => {
    return $http.request<ResType<any>>({
        method: 'POST',
        url: 'upload/album',
        headers: {// 设置请求标头的信息
            'Content-Type': 'multipart/form-data'
        },
        data
    });
}

export {
    getImgStreamAPI,
    uploadSinImgAPI
}