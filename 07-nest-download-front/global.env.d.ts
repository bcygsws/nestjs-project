// 注：在根目录下创建这个模块声明文件，然后.vue文件就不报错了
/// <reference types="vite/client" />
declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}