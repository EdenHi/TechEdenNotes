import {data as posts} from "./posts.data";

interface Item {
    text: string;
    link: string;
}

interface Section {
    text: string;
    items: Item[];
}

type IRouteConfig = Record<string, Section[]>
const processText = (text: string): { sort: number, text: string } => {
    const match = text.match(/^\d+-/);
    const res = {
        sort: 0,
        text: text.replace(/^\d+-/, '')
    }
    if (match) {
        // 如果匹配到数字前缀，则提取并转换为整数
        const numberPrefix = match[0].replace('-', '');
        res.sort = parseInt(numberPrefix, 10);
    }
    return res
};

function sortAndRemoveNumberPrefix(input: Section[] | Item[]): any {
    if (input && input.length) {
        const sortedSections = input.map((section) => {
            const {sort, text} = processText(section.text)
            let items = []
            if ("items" in section && section.items) {
                items = sortAndRemoveNumberPrefix(section.items)
            }
            const result = {
                sort,
                text,
                items,
                link: "link" in section ? section.link : ''
            }
            !result.items && delete result.items
            return result
        });
        return sortedSections.sort((a, b) => a.sort - b.sort)
    }
}

export default function sidebarGenerator(path?: string) {
    const result: IRouteConfig = {}
    const data = Object.values(posts).flat()
    for (const i of data) {
        const splitUrl = i.url.split('/')
        if (splitUrl.length > 5) return new Error('warning!')
        const dirUrl = [...splitUrl.slice(0, 3), ...['']].join('/')
        const restUrl = splitUrl.slice(3, splitUrl.length)
        result[dirUrl] = result[dirUrl] || []
        if (restUrl.length === 2) {
            const index = result[dirUrl].findIndex(i => i.text === restUrl[0])
            index === -1 ?
                result[dirUrl].push({
                    text: restUrl[0],
                    items: [{text: restUrl[1].replace('.html', ''), link: dirUrl + restUrl[0] + '/' + restUrl[1]}]
                }) : result[dirUrl][index].items &&
                result[dirUrl][index].items.push({
                    text: restUrl[1].replace('.html', ''),
                    link: dirUrl + restUrl[0] + '/' + restUrl[1]
                })
        }
    }
    for (const resultKey in result) {
        result[resultKey] = sortAndRemoveNumberPrefix(result[resultKey])
    }
    return path ? result[path] : result
}
