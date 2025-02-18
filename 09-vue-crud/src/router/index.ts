import {createRouter, createWebHistory} from "vue-router";

/**
 * @name: 路由
 * @description: 路由模块
 * @author: Bao Cheng yi
 *
 * */
const routes = [
    {
        path: '/',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/about',
        component: () => import('@/views/AboutView.vue')
    }

];
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;