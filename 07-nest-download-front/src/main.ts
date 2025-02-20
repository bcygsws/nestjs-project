import {createApp} from 'vue';
import './style.css';
import App from './App.vue'
import router from "@/router/index.ts";

const app = createApp(App);
// 注册路由
app.use(router);
app.mount('#app');

/**
 * @一、配置路径联想和scss
 * 1.1 下载sass@1.78.0
 * npm i sass@1.78.0 --save
 * 1.2 在vite配置文件中配置，然后在config.json文件中配置路径联想
 *
 * @二、配置路由
 * 2.1 装包
 * npm i vue-router --save
 *
 * 2.2 新建router/index.ts,配置路由；
 * 并在main.ts中注册
 *
 * @三、配置UI框架element-plus
 * 3.1 装包
 * npm i element-plus --save
 *
 * 3.2 根据element-plus官网，配置自动导入
 *
 *
 *
 * */
