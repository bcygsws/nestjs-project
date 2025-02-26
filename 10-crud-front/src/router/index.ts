import {createRouter, createWebHistory} from "vue-router";

import Home from '@/views/home/index.vue';
import Main from '@/views/main/index.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/main',
        component: Main

    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;