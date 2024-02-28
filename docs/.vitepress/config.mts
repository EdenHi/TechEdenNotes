import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TechEdenNotes",
  description: "TechEdenNotes，融合技术探索与生活分享，记录点滴思考，分享独特体验。",
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  lang: 'zh-CN',
  base: '/TechEdenNotes',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    nav: [
      {
        text: '技术总结',
        link: ''
      }
    ],
    sidebar: {
      '/documents/':[
        {
          text: 'Documents',
          items: [
            {text: 'Markdown Examples', link: '/documents/markdown-examples'},
            {text: 'Runtime API Examples', link: '/documents/api-examples'}
          ]
        }
      ],
      '/tools/': [{
        text: 'Tools',
        items: [
          {text: 'Markdown Examples', link: '/tools/markdown-examples'},
          {text: 'test', link: '/tools/test'}
        ]
      }],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/EdenHi' }
    ],
    logo: '/logo.png',
  }
})
