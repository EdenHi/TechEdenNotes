import {data} from './theme/posts.data.js'

export default function (path: string) {
    const result = {}
    for (const i of data) {
        const splitUrl = i.url.split('/')
        if (splitUrl.length > 5) return new Error('warning!')
        const dirUrl = [...splitUrl.slice(0, 3), ...['']].join('/')

        const restUrl = splitUrl.slice(3, splitUrl.length)
        result[dirUrl] = result[dirUrl] || []
        if (restUrl.length === 2) {
            const index = result[dirUrl].findIndex(i => i.text === restUrl[0])
            if (index === -1) {
                i.frontmatter.default ? result[dirUrl].unshift({
                    text: restUrl[0],
                    items: [{text: i.frontmatter.title, link: dirUrl + restUrl[0] + '/' + restUrl[1]}]
                }) : result[dirUrl].push({
                    text: restUrl[0],
                    items: [{text: i.frontmatter.title, link: dirUrl + restUrl[0] + '/' + restUrl[1]}]
                })
            } else {
                result[dirUrl][index].items.push({
                    text: i.frontmatter.title,
                    link: dirUrl + restUrl[0] + '/' + restUrl[1]
                })
            }
        }
    }
    return result[path]
}
