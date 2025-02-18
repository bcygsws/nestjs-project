import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

function srcPath(dir: string) {
    return path.resolve(__dirname, dir);
}

const alias: Record<string, string> = {
    '@': srcPath('src')
};

export default defineConfig({
    plugins: [
        vue(),
        // 自动导入的方式，引入element-plus
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/scss/variables.scss";`
            }
        }
    },
    server: {
        // port: 3000,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
