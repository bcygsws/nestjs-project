import {createApp} from 'vue';
import App from './App.vue'
import router from "@/router/index.ts";

const app = createApp(App);
// 注册路由
app.use(router);
app.mount('#app');
