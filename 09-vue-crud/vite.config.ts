import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';// 需要安装node文件类型依赖的包 @types/node
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.tsx', '.ts', '.vue']
    },
    css: {
        preprocessorOptions: {
            scss: {
                javascriptEnabled: true,
                additionalData: `@import "@/styles/index.scss";`
            },
        }
    },
    server: {
        open: true,
    }

})
