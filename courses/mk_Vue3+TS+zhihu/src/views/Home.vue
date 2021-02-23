<template>
  <div>
    <ColumnList :list="list" />
  </div>
</template>

<script lang="ts">
import { GlobalDataProps } from '@/store'
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import ColumnList from '../components/ColumnList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const columns = computed(() => store.state.columns)
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    return {
      list: columns
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
