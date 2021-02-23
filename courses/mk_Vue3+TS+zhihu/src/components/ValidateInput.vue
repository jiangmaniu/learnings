<template>
  <div class="validate-input-container mb-3">
    <input
      v-if="tag === 'input'"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.value"
      @input="inputRef.onInput"
      @blur="inputRef.onBlurValidate"
      v-bind="$attrs"
    />

    <textarea
      v-else-if="tag === 'textarea'"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.value"
      @input="inputRef.onInput"
      @blur="inputRef.onBlurValidate"
      v-bind="$attrs"
    />
    <div v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './validateForm.vue'
interface RuleProp {
  type: 'required' | 'mail' | 'custom';
  message: string;
  validator?: () => boolean;
}
type TagProp = 'input' | 'textarea'
// eslint-disable-next-line no-useless-escape
const mailReg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
export type RulesProp = RuleProp[]
export default defineComponent({
  name: 'ValidateInput',
  inheritAttrs: false,
  props: {
    rule: Array as PropType<RulesProp>,
    tag: {
      type: String as PropType<TagProp>,
      default: 'input'
    },
    modelValue: String
  },
  setup (props, context) {
    console.log(context.attrs)
    const inputRef = reactive({
      message: '',
      value: props.modelValue || '',
      error: false,
      resetValue: () => {
        inputRef.value = ''
      },
      onInput: (e: KeyboardEvent) => {
        const keyValue = (e.target as HTMLInputElement).value
        inputRef.value = keyValue
        context.emit('update:modelValue', keyValue)
      },
      onBlurValidate: () => {
        if (props.rule) {
          const allPassed = props.rule.every(rule => {
            let isPassed = true
            inputRef.message = rule.message
            switch (rule.type) {
              case 'required':
                isPassed = inputRef.value.trim() !== ''
                break
              case 'mail':
                isPassed = mailReg.test(inputRef.value)
                break
              case 'custom':
                isPassed = rule.validator ? rule.validator() : true
                break
            }
            return isPassed
          })
          inputRef.error = !allPassed
          return allPassed
        }
        return true
      }
    })

    onMounted(() => {
      emitter.emit('form-item-validate', inputRef.onBlurValidate)
      emitter.emit('form-item-reset', inputRef.resetValue)
    })
    return {
      inputRef
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
