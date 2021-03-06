<template>
  <teleport to="#message">
    <div
      v-if="isVisible"
      class="alert alert-message fixed-top w-50 d-flex justify-content-between mx-auto mt-2"
      :class="classObject"
    >
      <span>{{message}}</span>
      <button type="button" class="btn-close" aria-label="Close" @click.prevent="hide"></button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate'

export type MessageType = 'error' | 'success'| 'primary'

export default defineComponent({
  name: 'Message',
  props: {
    type: {
      type: String as PropType<MessageType>,
      default: 'primary'
    },
    message: {
      type: String,
      default: ''
    }
  },
  emits: ['close-message'],
  setup (props, context) {
    useDOMCreate('message')

    const isVisible = ref(true)
    const hide = () => {
      isVisible.value = false
      context.emit('close-message', true)
    }
    const classObject = computed(() => {
      return {
        'alert-primary': props.type === 'primary',
        'alert-danger': props.type === 'error',
        'alert-success': props.type === 'success'
      }
    })
    return {
      classObject,
      isVisible,
      hide
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
