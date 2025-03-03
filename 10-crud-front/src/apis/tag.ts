import {$http} from "@/utils/shared.ts";
import type {ResType} from "@/apis/shared.ts";

export interface ITag {
    value: number;
    label: string;
}
export interface ITagList {
    id: number;
    name: string;
}

/**
 * @desc:归纳tags表中所有行的标签名
 *
 * */
const getTagCatAPI = () => {
    return $http.request<ResType<any>, any>({
        method: 'get',
        url: '/tag'
    })
}
/**
 * @desc:在标签对话框，根据user id和tag列表，更新tag
 * id：user id
 * tags: tag列表;实例：{tags: ['Tag1', 'Tag2']}
 *
 * */
const updateTagAPI = (id: number, tags: string[]) => {
    return $http.request<ResType<any>, any>({
        method: 'PATCH',
        url: `/tag/${id}`,
        data: {
            tags
        }
    })
}

/**
 * @desc：根据行id和tags表中被删除标签的id,删除操作
 *
 * */
const delTagByIdsAPI = (row_id: number, tags_id: number) => {
    return $http.request<ResType<any>, any>({
        method: 'DELETE',
        url: `/tag/${row_id}/${tags_id}`
    });
}

export {
    getTagCatAPI,
    updateTagAPI,
    delTagByIdsAPI
}