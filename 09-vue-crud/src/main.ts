import {createApp} from 'vue';
import App from './App.vue';
import './style.scss';
import router from "@/router/index";
import ElementPlus from 'element-plus';
// 还要导入element plus样式文件
import 'element-plus/dist/index.css';
// 支持Volar在tsconfig.json中配置

const app = createApp(App);
// 注册element-plus
app.use(ElementPlus);
// 注册路由
app.use(router);
app.mount('#app');
