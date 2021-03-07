<template>
  <teleport to="#model">
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click.prevent="onCancel"></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click.prevent="onCancel">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="onConfirm">确定</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate'
export default defineComponent({
  name: 'Model',
  props: {
    visible: Boolean,
    title: {
      type: String,
      default: '提示'
    }
  },
  emits: ['on-confirm', 'on-cancel'],
  setup (props, context) {
    useDOMCreate('model')
    const onCancel = () => {
      context.emit('on-cancel')
    }
    const onConfirm = () => {
      context.emit('on-confirm')
    }

    return {
      onConfirm,
      onCancel
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
