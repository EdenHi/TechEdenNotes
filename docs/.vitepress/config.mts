import {defineConfig} from 'vitepress'
import {fileURLToPath, URL} from 'node:url'
// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "TechEdenNotes",
    description: "TechEdenNotes，融合技术探索与生活分享，记录点滴思考，分享独特体验。",
    head: [['link', {rel: 'icon', href: '/logo.png'}]],
    lang: 'zh-CN',
    base: '/TechEdenNotes',
    lastUpdated: true,
    vite: {
        resolve: {
            alias: [
                {
                    find: /^.*\/VPSidebar\.vue$/,
                    replacement: fileURLToPath(
                        new URL('./theme/MyVpSideBar.vue', import.meta.url)
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
                text: '',
                link: ''
            }
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
