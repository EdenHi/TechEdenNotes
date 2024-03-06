<template>
  <div id="doc-container">
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
    <div class="sidebar" v-if="monthGroup.length">
      <a v-for="li in monthGroup">{{ li }}</a>
    </div>
    <hr id="hr"/>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import {data as posts} from './posts.data.js'
import {useData, useRouter, withBase} from "vitepress";

const router = useRouter()
const {isDark} = useData()

const config = {
  SHOW_NUM: 4,
  TOTAL_NUM: posts.length
}
const monthGroup = ref<string[]>([])
const dayjsCDN = document.createElement('script')
dayjsCDN.setAttribute('src', 'https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js')
document.head.appendChild(dayjsCDN)
dayjsCDN.onload = () => {
  monthGroup.value = Array.from(new Set(posts.map(post => (window as any).dayjs(post.frontmatter.date).format('YYYY年M月'))))
}

const showItems = ref(posts.slice(0, config.SHOW_NUM - 1))

const loadData = () => {
  const prevLength = showItems.value.length
  showItems.value = [...showItems.value, ...posts.slice(prevLength, prevLength + config.SHOW_NUM)]
}
const disableLoad = ref(false)
onMounted(() => {
  window.addEventListener('scroll', function () {
    if (disableLoad.value) return
    const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPosition + windowHeight >= documentHeight - 10) {
      loadData()
    }
  });
})
</script>
<style scoped>
#doc-container {
  display: flex;
  justify-content: space-between;
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

  .sidebar {
    display: flex;
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

  .sidebar {
    display: none;
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

.sidebar {
  max-height: 400px;
  width: 200px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 10px;
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-left: 20px;
  font-size: 20px;
  cursor: pointer;
}

.sidebar > a {
  padding: 10px 0;
}
</style>
