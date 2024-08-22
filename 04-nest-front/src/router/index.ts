import {createRouter, createWebHistory} from "vue-router";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";

const routes = [{
    path:'/',
    component:Login
},{
    path:'/home',
    component: Dashboard
}];
const router = createRouter({
    history: createWebHistory(),// 路由使用history模式，而不是hash模式
    routes
});
export default router;