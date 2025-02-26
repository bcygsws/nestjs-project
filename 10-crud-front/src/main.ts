import {createApp} from 'vue';
import './style.scss';
import App from './App.vue';
import ElementPlus from 'element-plus';
import router from "@/router/index.ts";

const app = createApp(App);
// 使用element-plus框架
app.use(ElementPlus);
// 路由注册
app.use(router);
app.mount('#app');
