import {defineStore} from "pinia";
import {computed} from "vue";

const useTokenStore = defineStore("my_token", {
    state: () => ({
        accessToken: "" || localStorage.getItem('ACCESS_TOKEN'),
        refreshToken: "" || localStorage.getItem('REFRESH_TOKEN')
    }),
    getters: {
        getAccessToken(state) {
            return computed(() => state.accessToken).value;
        },
        getRefreshToken(state) {
            return computed(() => state.refreshToken).value;
        }
    },
    actions: {
        // 保存token
        saveAccessToken(token: string) {
            localStorage.setItem('ACCESS_TOKEN', token)
            // 让登录完成后，accessToken和refreshToken都是最新值
            this.accessToken = localStorage.getItem('ACCESS_TOKEN');
        },
        saveRefreshToken(token: string) {
            localStorage.setItem('REFRESH_TOKEN', token);
            this.refreshToken = localStorage.getItem('REFRESH_TOKEN');
        },
        // 删除token
        clearToken(name: string) {
            localStorage.removeItem(name);
        },

    }

});
export default useTokenStore;