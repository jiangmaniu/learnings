import { onUnmounted } from 'vue'

export default function (domId: string) {
  const node = document.createElement('div')
  node.id = domId
  document.body.appendChild(node)

  onUnmounted(() => {
    document.body.removeChild(node)
  })
}
