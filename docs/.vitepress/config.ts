import {defineConfig} from 'vitepress'
import {fileURLToPath, URL} from 'node:url'
import UnoCSS from 'unocss/vite'
// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Eden Notes",
    // description: "TechEdenNotes，融合技术探索与生活分享，记录点滴思考，分享独特体验。",
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
                        new URL('./theme/components/MyVpSidebar.vue', import.meta.url)
                    )
                },
                {
                    find: /^.*\/VPHome\.vue$/,
                    replacement: fileURLToPath(
                        new URL('./theme/components/MyVPHome.vue', import.meta.url)
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
                text: '分类',
                items: [
                    {text: '前端开发', link: '/posts/前端开发/0-/1-简介'},
                    {text: '其他语言', link: '/posts/其他语言/0-/1-简介'},
                    {text: '健身学习', link: '/posts/健身学习/0-/1-简介'},
                    {text: '胡乱折腾', link: '/posts/胡乱折腾/0-/1-简介'},
                    {text: '本站介绍', link: '/posts/本站介绍/0-/1-简介'},
                ]
            }
        ],
        sidebar: {
            '/': [
                {
                    items: [{}]
                }
            ]
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/EdenHi'}
        ],
        // logo: '/logo.png',
    }
})

