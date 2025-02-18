const Home = () => import('@/views/home/HomeView.vue');
const Main = () => import('@/views/main/MainView.vue');
import {createRouter, createWebHistory} from "vue-router";

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
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;