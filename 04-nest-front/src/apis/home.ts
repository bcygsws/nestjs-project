/**
 * @name:
 * @desc:
 *
 *
 * */
import $http from "@/utils/http.ts";
import ResType from "@/apis/shared";

const getListAPI = () => {
    return $http.request<ResType<string>>({
        method: "GET",
        url: "/api/test"
    });
}
export {getListAPI};