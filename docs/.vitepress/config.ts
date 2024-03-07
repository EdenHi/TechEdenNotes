import {defineConfig} from 'vitepress'
import {fileURLToPath, URL} from 'node:url'
import UnoCSS from 'unocss/vite'
// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "TechEdenNotes",
    description: "TechEdenNotes，融合技术探索与生活分享，记录点滴思考，分享独特体验。",
    head: [['link', {rel: 'icon', href: '/logo.png'}]],
    lang: 'zh-CN',
    base: '/TechEdenNotes',
    lastUpdated: true,
    vite: {
        plugins: [
            UnoCSS()
        ],
        resolve: {
            alias: [
                {
                    find: /^.*\/VPSidebar\.vue$/,
                    replacement: fileURLToPath(
                        new URL('./theme/components/MyVpSideBar.vue', import.meta.url)
                    )
                }
            ]
        }
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: 'local'
        },
        nav: [
            {
                text: '技术总结',
                link: '/posts/技术总结/1-简介/基本信息'
            },
            {
                text: '日常分享',
                link: '/'
            },
            {
                text: '本站详情',
                link: '/posts/本站详情/1-简介/基本信息'
            },
        ],
        sidebar: {
            '/': [
                {
                    items: []
                }
            ]
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/EdenHi'}
        ],
        logo: '/logo.png',
    }
})
