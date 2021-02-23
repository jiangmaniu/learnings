<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <ValidateInput
          v-model="titleVal"
          placeholder="请输入文章标题"
          maxlength="10"
          type="text"
          :rules="titleRules"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章内容：</label>
        <ValidateInput
          v-model="contentVal"
          placeholder="请输入文章内容"
          tag="textarea"
          rows="5"
          :rules="contentRules"
        />
      </div>

      <template #submit>
        <button class="btn btn-primary">提交</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps } from '@/store'
import { PostProps } from '@/testData'
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateForm from '../components/validateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'

const titleRules: RulesProp = [
  {
    type: 'required',
    message: '标题不能为空'
  }
]

const contentRules: RulesProp = [
  {
    type: 'required',
    message: '内容不能为空'
  }
]

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const postData = reactive({
      titleVal: '',
      contentVal: '',
      onFormSubmit: (v: boolean) => {
        if (v) {
          const { column } = store.state.user
          if (column) {
            const post: PostProps = {
              id: Date.now(),
              title: postData.titleVal,
              content: postData.contentVal,
              createdAt: new Date().toLocaleString(),
              columnId: +column
            }
            store.commit('createPost', post)
            router.push(`/column/${column}`)
          }
        }
      }
    })

    return {
      ...toRefs(postData),
      titleRules,
      contentRules
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
