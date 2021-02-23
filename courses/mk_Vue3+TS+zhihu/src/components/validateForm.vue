<template>
  <form class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="onClickSubmit">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    let resetArr: Function[] = []
    const onClickSubmit = () => {
      console.log(funcArr)
      const result = funcArr.map(func => func()).every(valid => valid)
      context.emit('form-submit', result)
      if (result) {
        // resetArr.forEach(func => func())
      }
    }
    const validateCallback = (func?: ValidateFunc) => {
      funcArr.push(func as ValidateFunc)
    }
    const resetCallback = (func?: Function) => {
      resetArr.push(func as Function)
    }
    emitter.on('form-item-validate', validateCallback)
    emitter.on('form-item-reset', resetCallback)
    onUnmounted(() => {
      emitter.off('form-item-validate', validateCallback)
      emitter.off('form-item-reset', resetCallback)
      resetArr = []
      funcArr = []
    })
    return {
      onClickSubmit
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
