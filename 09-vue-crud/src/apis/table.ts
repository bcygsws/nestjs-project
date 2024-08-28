import $http from "@/utils/http.ts";
import {ResType} from "@/apis/shared.ts";

export interface IQuery {
    keywords: string
    page: number
    pageSize: number
    total?: number
}

export interface IUser {
    id?: number
    name: string
    desc: string
}

export interface IInfo {
    total: number
    list: IUser[]
}

// 根据keywords page pageSize分页获取数据接口
const getPageListAPI = (val: IQuery) => {
    const {keywords, page, pageSize} = val;
    return $http.request<ResType<IInfo>>({
        url: '/user',
        params: {// 查询参数
            keywords,
            page,
            pageSize
        }
    });
}
// 添加数据接口
const addItemAPI = (val: User) => {
    const {name, desc} = val;
    return $http.request({
        method: 'post',
        url: '/user',
        data: {
            name,
            desc
        }
    })

}
export {
    getPageListAPI,
    addItemAPI
}