import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from "path";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

function srcPaths(srcPath: string) {
    return resolve(__dirname, srcPath);
}

// https://vite.dev/config/
export default defineConfig({
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
            '@': srcPaths('src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/css/variables.scss";`
            },
        },
    },
    server: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
