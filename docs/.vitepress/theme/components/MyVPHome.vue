<script setup lang="ts">
import "../rainbow.css";
import VPHomeHero from 'vitepress/dist/client/theme-default/components/VPHome.vue'
// import VPHomeFeatures from 'vitepress/dist/client/theme-default/components//VPHomeFeatures.vue'
import VPHomeContent from 'vitepress/dist/client/theme-default/components//VPHomeContent.vue'
import {Content, useData} from 'vitepress';

const {isDark} = useData()
const {frontmatter} = useData()
</script>

<template>
  <div class="VPHome">
    <div style="--vp-offset: calc(50% - 702px);"
         class="h-130 max-w-[1280px] px-[24px] mx-a sm-px-[48px] lg-px-[64px] flex items-center">
      <div>

        <div
            class="rainbow text-7xl font-bold text-transparent bg-clip-text">EdenTechNotes
        </div>
        <div class="mt-6 leading-15 text-4xl">
          融合技术探索与生活分享，
          <br>
          记录点滴思考，分享独特体验。
        </div>
        <div>
        </div>
      </div>
      <div class="ml-60 relative">
        <div class="w-full h-full rainbow blur-[80px] absolute">
        </div>
        <div class="text-8xl grid grid-cols-2 grid-rows-2">
          <span class="w-1/2 p-2 font-bold"
                v-for="text in 'EDEN'">{{
              text
            }}</span>
        </div>
      </div>
    </div>
    <VPHomeContent v-if="frontmatter.markdownStyles !== false">
      <Content/>
    </VPHomeContent>
    <Content v-else/>
  </div>
</template>

<style scoped>

.VPHome {
  margin-bottom: 96px;
}

.rainbow {
  background-image: linear-gradient(-45deg, var(--vp-c-brand-1) 30%, var(--vp-c-brand-next));
  animation: rainbow 4s linear infinite;
}

@media (min-width: 768px) {
  .VPHome {
    margin-bottom: 128px;
  }
}
</style>
