import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
// 引入element plus的样式文件
import 'element-plus/dist/index.css';
import router from '@/router/index';

const app = createApp(App);
// 全局引入element-plus插件
app.use(ElementPlus);
// 注册路由
app.use(router);

app.mount('#app');

/**
 * @配置过程：
 * 参考文档：https://blog.csdn.net/weixin_44066182/article/details/136027815
 * 1.安装sass,在vite配置文件中，配置支持scss
 * 2.给src路径，起别名
 * 3.全局引入element-plus组件，做测试，不考虑性能
 * 4.
 *
 *
 * */
