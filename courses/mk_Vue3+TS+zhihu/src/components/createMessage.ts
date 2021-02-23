import { createApp } from 'vue'
import Message from './Message.vue'

export type MessageType = 'error' | 'success'| 'primary'

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  const messageInstance = createApp(Message, {
    message,
    type
  })

  const node = document.createElement('div')
  document.body.appendChild(node)

  messageInstance.mount(node)

  setTimeout(() => {
    messageInstance.unmount(node)
    document.body.removeChild(node)
  }, timeout)
}

export default createMessage
