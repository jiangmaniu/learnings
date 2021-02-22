import { reactive, onMounted, onUnmounted, toRefs } from 'vue'

function useMousePosition () {
  // 跟踪鼠标位置
  const mouseData = reactive({
    x: 0,
    y: 0
  })
  const updateMouse = (e: MouseEvent) => {
     mouseData.x = e.pageX
     mouseData.y = e.pageY
  }

  onMounted(() => {
    document.addEventListener('click', updateMouse)
  })

  onUnmounted(() => {
    document.removeEventListener('click', updateMouse)
  })

  const refMouseData = toRefs(mouseData)

  return refMouseData
}

export default useMousePosition