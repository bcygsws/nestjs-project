import {$http} from '@/utils/shared.ts';
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
    createdAt: string
    updatedAt: string
    tags: Array<any>
}
export type ITotal = {
    total: number
}
export type IData = {
    list: Array<IList>;
    total: ITotal
}
export type ResType<T> = {
    code: number;
    data: T;
    msg: string;
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

export {
    getListAPI
}