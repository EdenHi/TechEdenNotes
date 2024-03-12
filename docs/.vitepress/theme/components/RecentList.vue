<template>
  <div id="doc-container" ref="listRef">
    <div class="doc-outer-box">
      <div class="doc-item" @click="router.go(withBase(post.url||''))" v-for="post in showItems" :key="post.url">
        <img class="illustration" :src="withBase(post.frontmatter.img||'')" alt="">
        <div class="doc-preview">
          <div class="doc-preview-title">{{ post.frontmatter.title }}</div>
          <div class="doc-preview-tag"><span v-for="tag in post.frontmatter.tags">{{ tag }}</span></div>
          <div class="doc-preview-describe">{{ post.frontmatter.describe }}</div>
        </div>
      </div>
    </div>
    <div class="resume xl-flex sm-hidden" ref="resumeRef">
      <div class="flex p-5 justify-between">
        <img src="https://avatars.githubusercontent.com/u/90376120?s=400&u=b647b1d8d7273465a9cf3800ed76d9a10db170e1&v=4"
             class="w-20 h-20 rounded-36" alt="avatar">
        <div class="flex flex-col flex-1 justify-between text-2xl text-right">
          <span>Eden</span>
          <span>Zhang</span>
        </div>
      </div>
      <hr class="!mt-0">
      <div class="px-4 text-xl leading-10">
        <span class="text-[var(--vp-c-brand-next)] font-bold">
        先问对不对，再问为什么。
        </span>
        <br>
        男，23岁，金牛。
      </div>
      <hr class="!mt-0">
      <div class="truncate px-4 pb-4 text-xl leading-10">
        <a href="mailto:EdenZhang0424@outlook.com">EdenZhang0424@outlook.com</a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'
import {data} from '../../../../scripts/posts.data'
import {useData, useRouter, withBase} from "vitepress";

const router = useRouter()
const {isDark} = useData()
console.log(data)
const posts = data.filter(i => !i.frontmatter.default)

const config = {
  SHOW_NUM: 4,
  TOTAL_NUM: posts.length
}

const showItems = ref(posts.slice(0, config.SHOW_NUM - 1))

const loadData = () => {
  const prevLength = showItems.value.length
  showItems.value = [...showItems.value, ...posts.slice(prevLength, prevLength + config.SHOW_NUM)]
}
const disableLoad = ref(false)
const listRef = ref<HTMLElement>()
const resumeRef = ref<HTMLElement>()
const onScroll = () => {
  if (disableLoad.value) return
  if (listRef.value && resumeRef.value) {
    if (!resumeRef.value.style.position) resumeRef.value.style.position = 'absolute'
    const top = listRef.value?.getBoundingClientRect().top
    const margin = listRef.value?.getBoundingClientRect().left.toFixed()
    if (resumeRef.value.style.position === 'absolute' && top < 100) {
      resumeRef.value.style.position = 'fixed'
      resumeRef.value.style.top = '100px'
      resumeRef.value.style.right = margin + 'px'
    } else if (resumeRef.value.style.position === 'fixed' && top > 100) {
      resumeRef.value.style.position = 'absolute'
      resumeRef.value.style.top = '0'
      resumeRef.value.style.right = '0'
    }
  }
  const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  if (scrollPosition + windowHeight >= documentHeight - 10) {
    loadData()
  }
}
onMounted(() => {
  window.addEventListener('scroll', onScroll);
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
<style scoped>
#doc-container {
  //display: flex;
  //justify-content: space-between;
}

@media screen and (min-width: 900px) {
  .doc-item {
    width: 100%

  }

  .doc-outer-box {
    width: 70%

  }

  .illustration {
    width: 200px;
    height: 200px;
  }
}

@media screen and (max-width: 900px) {
  .doc-item {
    width: 100%
  }

  .doc-outer-box {
    width: 100%

  }

  .illustration {
    width: 15vw;
    height: 15vw;
  }
}

.doc-item {
  display: flex;
  margin-bottom: 30px;
  border-radius: 10px;
  background-color: var(--vp-c-bg-alt);
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.doc-item:hover {
  transform: scale(1.015);
}

.illustration {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.doc-preview {
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.doc-preview-title {
  font-size: 28px;
}

.doc-preview-tag > span {
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid skyblue;
  border-radius: 10px;
}

.doc-preview-describe {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 显示的行数 */
}

.resume {
  width: 300px;
  height: auto;
  background-color: var(--vp-c-bg-alt);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
}

.sidebar > a {
  padding: 10px 0;
}
</style>
