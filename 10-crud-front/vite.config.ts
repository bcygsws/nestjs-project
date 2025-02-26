import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// 获取当前项目src路径函数
function srcPath(srcPath: string) {
    return resolve(__dirname, srcPath);
}

// https://vite.dev/config/
export default defineConfig({
    // 配置element-plus的插件自动引入
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': srcPath('src'),
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/scss/global.scss";`,
            },
        },
    },
    server: {
        open: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:3001',
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, ''),
        //     },
        // },
    },
})
