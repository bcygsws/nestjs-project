import {$http} from "@/utils/shared.ts";
import type {ResType} from "@/apis/shared.ts";

const getTagCatAPI = () => {
    return $http.request<ResType<any>>({
        method: 'get',
        url: '/tag'
    })
}
export {
    getTagCatAPI
}