<template>
  <div>
    <ColumnList :list="list" />
    <button v-if="!isLastPage" class="btn btn-outline-primary mx-auto d-block w-25" @click.prevent="loadMore">加载更多</button>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps } from '@/store'
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import useLoadMore from '../hooks/useLoadMore'
import ColumnList from '../components/ColumnList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const columns = computed(() => store.getters.getColumns)
    const total = computed(() => store.state.columns.total)
    const currentPage = computed(() => store.state.columns.currentPage ? store.state.columns.currentPage + 1 : 2)
    const pageSize = 4
    onMounted(() => {
      store.dispatch('fetchColumns', { pageSize })
    })

    const { loadMore, isLastPage } = useLoadMore('fetchColumns', total, { currentPage: currentPage.value, pageSize })
    return {
      list: columns,
      loadMore,
      isLastPage
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
