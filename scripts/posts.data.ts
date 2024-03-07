// posts.data.js
import {createContentLoader} from 'vitepress'

export const data: {
    frontmatter: {
        title: string,
        tags: string[],
        img: string,
        describe: string,
        date: string,
        default?: boolean
    },
    url: string,

}[] = []
export default createContentLoader('posts/**/*.md', {
    excerpt: true,    // 包含摘录?
    transform(rawData) {
        // return rawData
        return rawData.sort((a, b) => {
            return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
        }).map((page) => {
            // page.src     // 原始 markdown 源
            // page.html    // 渲染的整页 HTML
            // page.excerpt // 渲染的摘录 HTML（第一个 `---` 上面的内容）
            return {frontmatter: page.frontmatter, url: page.url}
        })
    }
})
