import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from "path";

function srcPaths(srcPath: string) {
    return resolve(__dirname, srcPath);
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
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
                // target: 'http://localhost:8081',
                // changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
