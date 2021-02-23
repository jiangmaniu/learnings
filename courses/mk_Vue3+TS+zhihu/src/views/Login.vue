<template>
  <ValidataForm class="w-25 mx-auto" @form-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">电子邮箱</label>
      <ValidateInput v-model="emailValue" placeholder="请输入邮箱" type="text" :rule="emailRules" />
    </div>
    <div class="mb-3">
      <label class="form-label">密码</label>
      <ValidateInput v-model="passwordValue" placeholder="请输入密码" type="password" :rule="passwordRules" />
    </div>
    <template #submit>
      <span class="btn btn-primary w-100">提交</span>
    </template>
  </ValidataForm>
</template>

<script lang="ts">
import createMessage from '@/components/createMessage'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidataForm from '../components/validateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'

const emailRules: RulesProp = [
  {
    type: 'required',
    message: '不能为空'
  },
  {
    type: 'mail',
    message: '格式不正确'
  }
]
const passwordRules: RulesProp = [
  {
    type: 'required',
    message: '不能为空'
  }
]

export default defineComponent({
  name: 'Login',
  components: {
    ValidataForm,
    ValidateInput
  },
  setup () {
    const emailValue = ref('111@test.com')
    const passwordValue = ref('111111')
    const store = useStore()
    const router = useRouter()
    const onFormSubmit = (v: boolean) => {
      if (v) {
        const payload = {
          email: emailValue.value,
          password: passwordValue.value
        }
        store.dispatch('loginAndFetch', payload).then(data => {
          createMessage('登录成功，2秒后跳转首页', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }).catch(err => {
          console.log(err)
        })
      }
    }
    return {
      emailValue,
      passwordValue,
      onFormSubmit,
      passwordRules,
      emailRules
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
