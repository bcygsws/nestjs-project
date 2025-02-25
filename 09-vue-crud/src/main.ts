import {createApp} from 'vue';
import App from './App.vue';
import './style.scss';
import router from "@/router/index";
import ElementPlus from 'element-plus';
// 支持Volar在tsconfig.json中配置

const app = createApp(App);
// 注册element-plus
app.use(ElementPlus);
// 注册路由
app.use(router);
app.mount('#app');

/**
 * @desc:前端框架element-plus
 * 说明：导入方式，选择框架推荐的自动引入的方式
 * 步骤：
 * 1.装element-plus包
 * npm i element-plus --save
 * 2.安装自动引入插件，在vite.config.ts中配置
 * npm install -D unplugin-vue-components unplugin-auto-import
 *
 * 3.在main.ts中引入element-plus
 *
 *
 * */
