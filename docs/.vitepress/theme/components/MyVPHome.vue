<script setup lang="ts">
import gsap from 'gsap'
import {data as posts} from '../../../../scripts/posts.data'
import {feathers} from '../../custom-config'
import {useData, useRouter, withBase} from 'vitepress';
import {onMounted, onUnmounted, ref, watch} from "vue";

const router = useRouter()
const {isDark} = useData();

console.log(posts)
const handleJump = (link: string) => {
  router.go(withBase(link))
}
gsap.to('.animate_box', {x: 100,y:100})
console.log(gsap)
</script>

<template>
  <div class="mx-a w-[80%] md-max-w-[980px] font-custom flex">
    <div class="flex-1">
      <div class="border-double mb-1 border-6 p-4" v-for="(array,month) in posts">
        <div class="date mb-4">
          {{ month }}
        </div>
        <div @click="handleJump(post.url)" class="cursor-pointer hover:opacity-70" v-for="(post,index) in array">
          <h1 class="font-bold mb-2 text-lg">
            {{ post.header.title }}
          </h1>
          <p v-html="post.excerpt"></p>
          <div v-if="index!==array.length-1" class="border-b-dotted border-coolGray border-2 my-2"></div>
        </div>
      </div>
    </div>
    <div class="w-50 relative">
      <div class="sticky top-0 ml-4">
        <div class="border-double mb-1 border-6 p-4" v-for="(array,month) in posts">
          <div class="date mb-4 flex items-baseline">
            {{ month }}<img class="w-20px object-contain animate_box" src="../../../assets/icons/bottom.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.date {
  font-family: "Niconne";
  font-size: 42px;
  line-height: 30px;
}

.font-custom {
  font-family: "SourceHanSerifCN";
}
</style>
