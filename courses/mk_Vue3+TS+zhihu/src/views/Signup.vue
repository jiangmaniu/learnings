<template>
  <ValidataForm class="w-50 mx-auto" @form-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">电子邮箱</label>
      <ValidateInput v-model="formData.emailValue" placeholder="请输入邮箱" type="text" :rule="emailRules" />
    </div>
    <div class="mb-3">
      <label class="form-label">名称</label>
      <ValidateInput v-model="formData.nameValue" placeholder="请输入密码" type="password" :rule="nameRules" />
    </div>
    <div class="mb-3">
      <label class="form-label">密码</label>
      <ValidateInput v-model="formData.passwordValue" placeholder="请输入密码" type="password" :rule="passwordRules" />
    </div>
    <div class="mb-3">
      <label class="form-label">重复密码</label>
      <ValidateInput v-model="formData.repeactPasswordValue" placeholder="请输入密码" type="password" :rule="repeactPasswordRules" />
    </div>
    <template #submit>
      <span class="btn btn-primary w-100">提交</span>
    </template>
  </ValidataForm>
</template>

<script lang="ts">
import createMessage from '@/components/createMessage'
import axios from 'axios'
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import ValidataForm from '../components/validateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'

export default defineComponent({
  name: 'Singup',
  components: {
    ValidataForm,
    ValidateInput
  },
  setup () {
    const router = useRouter()
    const formData = reactive({
      emailValue: 'jiang1@test.com',
      nameValue: 'jiangmaniu',
      passwordValue: '123123',
      repeactPasswordValue: '123123'
    })
    const emailRules: RulesProp = [
      { type: 'required', message: '不能为空' },
      { type: 'mail', message: '格式不正确' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const nameRules: RulesProp = [
      { type: 'required', message: '名称不能为空' }
    ]
    const repeactPasswordRules: RulesProp = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        validator: () => formData.passwordValue === formData.repeactPasswordValue,
        message: '两次密码不相同'
      }
    ]

    const onFormSubmit = (valid: boolean) => {
      if (valid) {
        const payload = {
          email: formData.emailValue,
          nickName: formData.nameValue,
          password: formData.passwordValue
        }
        axios.post('/users', payload).then(rs => {
          createMessage('注册成功，正在跳转登录页面。', 'success')
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }).catch(err => {
          createMessage(err, 'error')
        })
      }
    }

    return {
      formData,
      emailRules,
      passwordRules,
      repeactPasswordRules,
      nameRules,
      onFormSubmit
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
