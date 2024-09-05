/**
 * @name:
 * @desc:存和取token的方法
 *
 * */
// 将token存入localStorage
function setToken(token: string) {
    localStorage.setItem('ACCESS_TOKEN', token);
}

// 从本地获取token
function getToken() {
    return localStorage.getItem('ACCESS_TOKEN');
}

// 清除token
function removeToken() {
    localStorage.removeItem('ACCESS_TOKEN');
}

export default {setToken, getToken, removeToken};
