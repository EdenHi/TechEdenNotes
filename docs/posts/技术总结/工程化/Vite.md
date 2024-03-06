---
title: Vite学习总结
tags: ['前端','构建工具']
img: https://cn.vitejs.dev/logo-with-shadow.png
describe: 过去以webpack为首的诸多构建工具在大型项目中启动缓慢，热更新迟钝，开发体验差。这是因为早期浏览器不支持ESM时构建工具都是基于打包器（Bundle）启动dev服务器。
---
# Vite学习总结 

当前最新版本为V5，本文档基于该版本记录。

# 为什么使用Vite？

过去以webpack为首的诸多构建工具在大型项目中启动缓慢，热更新迟钝，开发体验差。这是因为早期浏览器不支持ESM时构建工具都是基于打包器（Bundle）启动dev服务器。

## 服务器启动

当冷启动开发服务器时，基于打包器的方式启动必须优先抓取并构建你的整个应用，然后才能提供服务。Vite 通过在一开始将应用中的模块区分为`依赖`和`源码`两类，改进了开发服务器启动时间。

- `依赖`是一些第三方引用包，在开发中不会产生变更，并且有着多种模块化方式（ESM，CommonJs）。
- `源码`则是开发者自身编写的项目代码且并不是纯粹的JS文件，开发中会频繁变更，其语言、语法、文件类型亦不固定。

Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

## 开发热更新
基于打包器启动时，重建整个包的效率很低。原因显而易见：因为这样更新速度会随着应用体积增长而直线下降。尽管使用了`HMR`热替代模块，其更新速度在应用规模增长时仍然会显著下降。
在 Vite 中，`HMR`是在原生`ESM`上执行的。当编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的`HMR`边界之间的链失活（大多数时候只是模块本身），使得无论应用大小如何，`HMR`始终能保持快速更新。
Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。
## 为什么生产环境仍需打包？
尽管原生 ESM 现在得到了广泛支持，但由于嵌套导入会导致额外的网络往返，在生产环境中发布未打包的 ESM 仍然效率低下（即使使用`HTTP/2`）。为了在生产环境中获得最佳的加载性能，最好还是将代码进行`tree-shaking`、懒加载和`chunk`分割（以获得更好的缓存）。
## 为何不用 ESBuild 打包？
Vite 目前的插件 API 与使用 esbuild 作为打包器并不兼容。尽管 esbuild 速度更快，但 Vite 采用了 Rollup 灵活的插件 API 和基础建设，这对 Vite 在生态中的成功起到了重要作用。
# 功能
## 静态资源处理
在源码中导入一个静态文件，Vite会自动的将其转换为解析后的URL。

- `url()`引入的css文件也是同样操作。
- 如果使用了`vue`插件，在SFC模板中的资源引入会自动转换为导入。
- 常见的图像、媒体和字体文件类型被自动检测为资源。可以使用 [assetsInclude选项](https://cn.vitejs.dev/config/shared-options.html#assetsinclude) 扩展内部列表。
- 较小的资源体积小于 [assetsInlineLimit选项值](https://cn.vitejs.dev/config/build-options.html#build-assetsinlinelimit) 则会被内联为 base64 data URL。
```javascript
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```
添加一些特殊的查询参数可以更改资源被引入的方式：
### 显式URL引入
未包含在内部列表或assetsInclude中的资源，可以使用`?url`后缀显式导入为一个URL
### 将资源引入为字符串
资源可以使用`?raw`后缀声明作为字符串引入。
### 导入脚本为Worker
脚本可以通过`?worker`或`?sharedworker`后缀导入为 web worker。
### `public`目录
此目录下保存的一般是不会被源码应用、必须保持原文件名不被hash、的资源，在开发时直接通过`/`根路径访问到，并且打包时会被完整的复制到目标目录的根目录下。

- 引入`public`中的资源永远应该使用根绝对路径。
- `public`中的资源不应该被JavaScript文件引用。

### new URL(url, import.meta.url)
[import.meta.url](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta) 是一个 ESM 的原生功能，会暴露当前模块的 URL。将它与原生的 [URL 构造器](https://developer.mozilla.org/en-US/docs/Web/API/URL) 组合使用，在一个 JavaScript 模块中，通过相对路径我们就能得到一个被完整解析的静态资源 URL。
```javascript
function getImageUrl(name) {
  return new URL(`./dir/${name}.png`, import.meta.url).href
}
// URL()第一个参数必须是静态的，否则会报错
```

**注意：无法在 SSR 中使用**
如果你正在以服务端渲染模式使用 Vite 则此模式不支持，因为 import.meta.url 在浏览器和 Node.js 中有不同的语义。服务端的产物也无法预先确定客户端主机 URL。

## JSON
JSON 可以被直接导入 —— 同样支持具名导入：
```javascript
// 导入整个对象
import json from './example.json'
// 对一个根字段使用具名导入 —— 有效帮助 treeshaking！
import { field } from './example.json'
```
## Glob导入
Vite 支持使用特殊的`import.meta.glob`函数从文件系统导入多个模块：
```javascript
const modules = import.meta.glob('./dir/*.js')
// equals
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js'),
}
```
匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk。启用eager后可以对这些模块进行`tree-shaking`。

```javascript
const modules = import.meta.glob('./dir/*.js', { eager: true })
// vite 生成的代码
import * as __glob__0_0 from './dir/foo.js'
import * as __glob__0_1 from './dir/bar.js'
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1,
}
```
### 多个匹配模式

第一个参数可以是个glob数组，例如：

```javascript
const modules = import.meta.glob(['./dir/*.js', './another/*.js'])
```
### 反面匹配模式
同样也支持反面 glob 匹配模式（以 ! 作为前缀）。若要忽略结果中的一些文件，可以添加“排除匹配模式”作为第一个参数：
```javascript
const modules = import.meta.glob(['./dir/*.js', '!**/bar.js'])
```
### 具名导入
也可能你只想要导入模块中的部分内容，那么可以利用`import`选项。
```javascript
const modules = import.meta.glob('./dir/*.js', {
  import: 'setup',
  eager: true,
})
```
`import`可选属性：`default`可以加载默认导出。
### 自定义查询
`query`选项提供对导入的自定义查询，以供其他插件使用。
```javascript
const modules = import.meta.glob('./dir/*.js', {
  query: { foo: 'bar', bar: true },
})
// equals
// vite 生成的代码
const modules = {
  './dir/foo.js': () => import('./dir/foo.js?foo=bar&bar=true'),
  './dir/bar.js': () => import('./dir/bar.js?foo=bar&bar=true'),
}
```
## 参考链接

*  [命令行](https://cn.vitejs.dev/guide/cli.html)

*  [配置](https://cn.vitejs.dev/config/shared-options.html)
