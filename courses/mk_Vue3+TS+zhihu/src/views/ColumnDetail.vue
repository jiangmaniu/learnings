<template>
  <div class="column-detail-page w-75 mx-auto" v-if="columnDetail">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img class="rounded-circle w-100" :src="columnDetail.avatar && columnDetail.avatar.fitUrl" :alt="columnDetail.title">
      </div>
      <div class="col-9">
        <h4>{{columnDetail.title}}</h4>
        <p class="text-muted">{{columnDetail.description}}</p>
      </div>
    </div>

    <PostList :list="columnPosts" />

    <button v-if="!isLastPage" class="btn btn-outline-primary mx-auto d-block w-25" @click.prevent="loadMore">加载更多</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ColumnProps, GlobalDataProps } from '../store'
import useLoadMore from '../hooks/useLoadMore'
import { generateFitUrl } from '@/utils/helper'
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
    const pageSize = 3
    onMounted(() => {
      store.dispatch('fetchColumn', columnId)
      store.dispatch('fetchPosts', { columnId, pageSize })
    })
    const loadedData = computed(() => store.state.posts.loadedColumns[String(columnId)] || {})
    const total = computed(() => loadedData.value.total || 0)
    const currentPage = computed(() => loadedData.value.currentPage ? loadedData.value.currentPage + 1 : 2)
    const columnDetail = computed(() => {
      const column = store.getters.getColumnById(columnId) as ColumnProps
      if (column) {
        generateFitUrl(column, 100, 100)
      }
      return column
    })
    const { loadMore, isLastPage } = useLoadMore('fetchPosts', total, { currentPage: currentPage.value, pageSize }, { columnId })
    const columnPosts = computed(() => store.getters.getPostsByCid(columnId))
    return {
      columnPosts,
      columnDetail,
      loadMore,
      isLastPage
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
