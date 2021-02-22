import { reactive, ref, toRefs } from 'vue'
import axios from 'axios'

function useURLLoader<T>(url: string) {
  const resultX = ref<T | null>(null)
  const data = reactive({
    result: null,
    loading: true,
    loaded: false,
    error: null
  })

  axios.get(url).then((rawData) => {
    data.loading = false
    data.loaded = true
    data.result = rawData.data
    resultX.value = rawData.data
  }).catch(err => {
    data.error = err
  })

  return {
    ...toRefs(data),
    resultX
  }
}

export default useURLLoader