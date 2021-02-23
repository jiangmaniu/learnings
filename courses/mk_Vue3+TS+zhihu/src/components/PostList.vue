<template>
  <div class="post-list">
    <article v-for="post of list" :key="post._id" class="card mb-3 shadows-sm">
      <div class="card-body">
        <h4>{{post.title}}</h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-4">
            <img class="rounded-lg w-100" :src="post.image.url" :alt="post.title" />
          </div>
          <p class="text-muted" :class="{'col-8': post.image}">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostProps } from '@/store'
export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
