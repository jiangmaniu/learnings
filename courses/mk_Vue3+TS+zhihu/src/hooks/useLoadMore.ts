import store from '@/store'
import { computed, ComputedRef, ref } from 'vue'

interface LoadParams {
  currentPage: number;
  pageSize: number;
}

function useLoadMore (actionName: string, total: ComputedRef<number>, params: LoadParams = { currentPage: 2, pageSize: 6 }, extraData = {}) {
  const currentPage = ref(params.currentPage)

  const loadMore = () => {
    const requestParams = {
      currentPage: currentPage.value,
      pageSize: params.pageSize,
      ...extraData
    }
    store.dispatch(actionName, requestParams).then(() => {
      currentPage.value++
    })
  }

  const isLastPage = computed(() => Math.ceil(total.value / params.pageSize) < currentPage.value)

  return {
    loadMore,
    isLastPage
  }
}

export default useLoadMore
