<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img class="rounded-circle w-100" :src="columnDetail.avatar && columnDetail.avatar.url" :alt="columnDetail.title">
      </div>
      <div class="col-9">
        <h4>{{columnDetail.title}}</h4>
        <p class="text-muted">{{columnDetail.description}}</p>
      </div>
    </div>

    <PostList :list="columnPosts" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import PostList from '../components/PostList.vue'
export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const columnId = route.params.id
    const columnDetail = computed(() => store.getters.getColumnById(columnId))
    const columnPosts = computed(() => store.getters.getPostsByCid(columnId))
    onMounted(() => {
      store.dispatch('fetchColumn', columnId)
      store.dispatch('fetchPosts', columnId)
    })
    return {
      columnPosts,
      columnDetail
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
