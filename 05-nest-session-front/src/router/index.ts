import HomeView from '@/views/home/HomeView.vue';
import MainView from "@/views/main/MainView.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/main',
        component: MainView
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;