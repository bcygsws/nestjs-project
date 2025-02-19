import {createRouter, createWebHistory} from "vue-router";

const Home = () => import('@/views/home/index.vue');
const Main = () => import('@/views/main/index.vue');

const routes = [
    {
        path: '/',
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: Home
            },
            {
                path: '/main',
                component: Main
            }
        ]
    }];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
