---
---
> CSS3引入了许多新特性和功能，极大地增强了样式和布局的能力，使网页设计更加灵活和丰富。以下是一些主要的CSS3新内容：
---

## 选择器
   CSS3引入了许多新的选择器，增强了对元素的精确选择能力：

属性选择器：

```css
/* 选择包含某属性的元素 */
[attribute]
    /* 选择某属性值等于某值的元素 */
[attribute=value]
    /* 选择某属性值以某值开头的元素 */
[attribute^=value]
    /* 选择某属性值以某值结尾的元素 */
[attribute$=value]
    /* 选择某属性值包含某值的元素 */
[attribute*=value]
```

伪类选择器：

```css
/* 选择第一个子元素 */
:first-child
    /* 选择最后一个子元素 */
:last-child
    /* 选择第n个子元素 */
:nth-child(n)
    /* 选择偶数子元素 */
:nth-child(even)
    /* 选择奇数子元素 */
:nth-child(odd)
    /* 选择仅有一个子元素的父元素 */
:only-child
    /* 选择没有子元素的元素 */
:empty
```

## 边框和背景
   CSS3提供了更灵活的边框和背景功能：

圆角边框：

```css
{
    border-radius: 10px
}
```

盒阴影：

```css
{
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5)
}
```

背景渐变：

```css
{
    background: linear-gradient(to right, red, yellow)
;

    background: radial-gradient(circle, red, yellow)
}

```

多背景：

```css
{
    background-image: url(image1.png), url(image2.png)
}
```

## 颜色和不透明度
   CSS3新增了更多颜色和不透明度控制：

RGBA颜色：

```css
{
    color: rgba(255, 0, 0, 0.5)
}
```

HSLA颜色：

```css
{
   color: hsla(120, 100%, 50%, 0.3)
}
```

透明度：

```css
{
    opacity: 0.5
}

```

## 文本效果
   CSS3引入了更多文本效果和排版功能：

文本阴影：

```css
{
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5)
}
```

多列布局：

```css
{
   column-count: 3
;
   column-gap: 10px
}
```

文本溢出处理：

```css
{
    text-overflow: ellipsis
}
```

## 变换
   CSS3引入了2D和3D变换，允许对元素进行旋转、缩放、倾斜和平移：

2D变换：

```css
{
   transform: rotate(45deg)
;

   transform: scale(1.5)
;

   transform: translate(50px, 100px)
;
}
```

3D变换：

```css
{
    transform: perspective(500px) rotateX(45deg)
}
```

## 动画
   CSS3允许使用关键帧定义复杂的动画效果：

过渡效果：

```css
{
   transition: all 0.3s ease-in-out
}
```

关键帧动画：

```css

@keyframes myAnimation {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100px);
    }
}

.animatedElement {
    animation: myAnimation 2s infinite;
}
```

## 弹性盒子布局（Flexbox）
   Flexbox提供了一种更加灵活和高效的布局方式：

```css

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.item {
    flex: 1 1 100px;
}
```

## 网格布局（Grid）
   Grid布局使得创建复杂的二维布局变得更加容易：

```css

.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100px 200px;
    grid-gap: 10px;
}

.item {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
}
```

## 媒体查询
   媒体查询使得响应式设计变得更加简单：

```css
@media (max-width: 600px) {
    .container {
        flex-direction: column;
    }
}
```

## 自定义属性（变量）
    CSS3允许使用自定义属性，增强了样式的可维护性：

```css
:root {
    --main-color: #3498db;
}

.element {
    color: var(--main-color);
}
```
