// posts.data.js
import {createContentLoader} from 'vitepress'

export const data: Record<string, {
    header: {
        title: string,
        tags: string[],
        date: string,
        default?: boolean
    },
    url: string,
    excerpt: string
}[]> = {}

export default createContentLoader('posts/**/*.md', {
    excerpt: true,    // 包含摘录?
    transform(rawData) {
        return rawData.sort((a, b) => {
            return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
        }).filter(data => !data.frontmatter.default).map((page) => {
            // page.src     // 原始 markdown 源
            // page.html    // 渲染的整页 HTML
            // page.excerpt // 渲染的摘录 HTML（第一个 `---` 上面的内容）
            return {header: page.frontmatter, url: page.url, excerpt: page.excerpt}
        }).reduce((acc: any, item) => {
            // 使用 Date 对象解析日期
            const date = new Date(item.header?.date);
            // 提取年份和月份
            const month = date.getUTCFullYear() + '-' + String(date.getUTCMonth() + 1).padStart(2, '0');
            // 如果该月份还没有在acc中存在，则创建一个新的数组
            if (!acc[month]) {
                acc[month] = [];
            }
            // 将当前项添加到相应的月份数组中
            acc[month].push(item);
            return acc;
        }, {})
    }
})
