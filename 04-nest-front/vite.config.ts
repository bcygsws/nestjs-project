import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    css: {// 安装sass包，配置scss
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/styles/variables.scss";',// 公共样式
                javascriptEnabled: true
            }
        }
    },
    server: {
        port: 5173,
        host: 'localhost',
        cors: true,// 允许跨域
        proxy: {
            '/api': {
                target: 'http://localhost:3000',// 目标服务器地址
                // target: 'http://127.0.0.1:3000',// 目标服务器地址
                changeOrigin: true,// 改变源地址，即使用跨域
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
})
