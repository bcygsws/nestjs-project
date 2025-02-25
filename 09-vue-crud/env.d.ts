//  env.d.ts,vue路径联想功能；就必须把vue模块声明文件放在根目录下，才能正确识别vue文件
// 这个文件生效的前提是 tsconfig.json 中配置了 "include": ["env.d.ts"],
// 配置后，vue组件路径不报警告了
declare module '*.vue' {
    import {DefineComponent} from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}