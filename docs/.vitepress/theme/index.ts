import type {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import MyLayout from "./MyLayout.vue";
const modules = import.meta.glob('./components/*.vue')
export default {
    extends: DefaultTheme,
    async enhanceApp({app}) {
        // 注册自定义全局组件
        for (const path of Object.keys(modules)) {
            const componentName = path.match(/\.\/components\/(.*).vue$/)[1];
            // if([''].includes(componentName))
            const component = await modules[path]()
            app.component(componentName, component.default || component);
        }
    },
    Layout: MyLayout
} satisfies Theme
