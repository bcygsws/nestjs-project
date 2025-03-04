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
    tags?: ILabel[]
    cratedAt?: string
}

export interface IInfo {
    total: number
    list: IUser[]
}

export interface ILabel {
    id?: number;
    tags: string;
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
const addItemAPI = (val: IUser) => {
    const {name, desc} = val;
    return $http.request<ResType<any>, any>({
        method: 'post',
        url: '/user',
        data: {
            name,
            desc
        }
    })

}
// 根据id值删除一条记录
const delItemAPI = (id: number) => {
    return $http.request({
        method: 'delete',
        url: `/user/${id}`
    })
}

// 根据id,编辑一条记录后提交
const editItemAPI = (val: IUser) => {
    const {id, name, desc} = val;
    return $http.request({
        method: 'patch',
        url: `/user/${id}`,
        data: {
            name,
            desc
        }
    })
}

// 根据列表id,为每条记录添加若干个标签
export interface ITag {
    userId?: number
    list: string[]
    id?: number
}

const addTagsAPI = (val: ITag) => {
    const {userId, list} = val;
    return $http.request<ResType<any>, any>({
        method: 'post',
        url: '/user/tags',
        data: {
            userId,
            list
        }
    })
}
// 根据tag的id,删除标签
const delTagAPI = (userId: number, tagId: number) => {
    return $http.request<ResType<any>, any>({
        method: 'delete',
        url: `/user/tags/${userId}/${tagId}`
    })
}

export {
    getPageListAPI,
    addItemAPI,
    delItemAPI,
    editItemAPI,
    addTagsAPI,
    delTagAPI
}