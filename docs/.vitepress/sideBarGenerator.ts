import {data} from './theme/posts.data.js'

export default function (path: string) {
    const result = {}
    for (const i of data) {
        const splitUrl = i.url.split('/')
        if (splitUrl.length > 5) return new Error('warning!')
        const dirUrl = [...splitUrl.slice(0, 3), ...['']].join('/')

        const restUrl = splitUrl.slice(3, splitUrl.length)
        result[dirUrl] = result[dirUrl] || [{text: '基础', items: []}]
        switch (restUrl.length) {
            case 1:
                result[dirUrl][0].items.push({text: restUrl[0], link: dirUrl + restUrl[0]})
                break;
            case 2:
                const index = result[dirUrl].findIndex(i => i.text === restUrl[0])
                if (index === -1) {
                    result[dirUrl].push({
                        text: restUrl[0],
                        items: [{text: restUrl[1], link: dirUrl + restUrl[0] + '/' + restUrl[1]}]
                    })
                } else {
                    result[dirUrl][index].items.push({text: restUrl[1], link: dirUrl + restUrl[0] + '/' + restUrl[1]})
                }
                break;
        }
    }
    return result[path]
}

