<template>
  <div>
    <h2>All Documents</h2>
    <ul >
      <li v-for="post in data">
        <a :href="post.url">{{ post.frontmatter.title }}</a>
        <img style="width: 100px;height: 100px;" :src="'/TechEdenNotes'+post.frontmatter.img" alt="">
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { data } from './posts.data.js'

console.log(data)
</script>
