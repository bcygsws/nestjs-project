import {$http} from '@/utils/shared.ts';
import type {ResType} from "@/apis/shared.ts";
import type {ITagList} from "@/apis/tag.ts";
// 查询参数
export type IQuery = {
    page: number;
    pageSize: number;
    total?: number;
    keywords: string;
}
export type IList = {
    id: number
    name: string
    desc: string
    createdAt?: string
    updatedAt?: string
    tags?: Array<ITagList>
    label?: any
}

export interface IForm {
    id?: number
    name: string
    desc: string
}

export type ITotal = {
    total: number
}
export type IData = {
    list: Array<IList>;
    total: ITotal
}


// ResType里泛型最后再明确
function getListAPI<T>(info: Partial<IQuery>) {
    const {page, pageSize, keywords} = info;
    // 特别注意：request<T,D>是两个参数，return返回的是AxiosResponse<T,D>
    return $http.request<ResType<T>, any>({
        method: "GET",
        url: "/user",
        params: {
            page,
            pageSize,
            keywords
        }
    })
}

// 【添加数据】 api
function addUserAPI<T>(info: Partial<IForm>) {
    const {name, desc} = info;
    return $http.request<ResType<T>, any>({
        method: "POST",
        url: "/user",
        data: {
            name,
            desc
        }
    })
}

// 【根据id修改数据】api
function editUserByIdAPI(id: number, info: Partial<IForm>) {
    const {name, desc} = info;
    return $http.request<ResType<any>, any>({
        method: "PATCH",
        url: `/user/${id}`,
        data: {
            name,
            desc
        }
    })
}

// 【根据id删除数据】api
function deleteUserByIdAPI(id: number) {
    return $http.request<ResType<any>, any>({
        method: "DELETE",
        url: `/user/${id}`
    })
}

export {
    getListAPI,
    addUserAPI,
    editUserByIdAPI,
    deleteUserByIdAPI
}