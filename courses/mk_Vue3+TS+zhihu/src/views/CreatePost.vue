<template>
  <div class="create-post-page">
    <h4>{{ isEditMode ? '编辑文章' : '新建文章' }}</h4>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <Uploader
          actions="/upload"
          class="uploader d-flex justify-content-center align-items-center bg-light text-secondary w-100 my-2"
          :beforeUpload="uploadCheck"
          :uploaded = 'uploadData'
          @file-uploaded="onFileUploaded"
        >
          <h2>点击上传图片</h2>
          <template #loading>
            <div class="d-flex">
              <div class="spinner-border text-secondary">
                <span class="sr-only visually-hidden">Loading...</span>
              </div>
              <h2 class="ms-2">正在上传</h2>
            </div>
          </template>
          <template #uploaded="{ uploadedData }">
            <img class="img" :src="uploadedData.data.url" />
          </template>
        </Uploader>
      </div>
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
import { GlobalDataProps, ResponseType, ImageProps, PostProps } from '@/store'
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { beforeUploadCheck } from '../utils/helper'
import ValidateForm from '../components/validateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import Uploader from '../components/Uploader.vue'
import createMessage from '../components/createMessage'
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
    ValidateInput,
    Uploader
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const isEditMode = ref(!!route.query.id)
    const uploadData = ref()
    let imageId = ''
    const postData = reactive({
      titleVal: '',
      contentVal: '',
      onFormSubmit: (v: boolean) => {
        if (v) {
          const { column, _id } = store.state.user
          if (column) {
            const newPost: PostProps = {
              title: postData.titleVal,
              content: postData.contentVal,
              column,
              author: _id
            }
            if (imageId) {
              newPost.image = imageId
            }
            const actionName = isEditMode.value ? 'updatePost' : 'createPost'
            const sendData = isEditMode.value ? {
              id: route.query.id,
              payload: newPost
            } : newPost
            store.dispatch(actionName, sendData).then(() => {
              createMessage('提交成功，2秒后跳转到文章', 'success', 2000)

              setTimeout(() => {
                router.push(`/column/${column}`)
              }, 2000)
            })
          }
        }
      }
    })

    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })

      if (result.error === 'size') {
        createMessage('文件大小不能超过1M', 'error')
      } else if (result.error === 'format') {
        createMessage('文件类型错误', 'error')
      }

      return result.passed
    }

    onMounted(() => {
      if (isEditMode.value) {
        store.dispatch('fetchPost', route.query.id).then((rs: ResponseType<PostProps>) => {
          const currentPost = rs.data
          if (currentPost.image) {
            uploadData.value = { data: currentPost.image }
            postData.titleVal = currentPost.title
            postData.contentVal = currentPost.content || ''
          }
        })
      }
    })

    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }

    return {
      isEditMode,
      uploadCheck,
      onFileUploaded,
      ...toRefs(postData),
      titleRules,
      contentRules,
      uploadData
    }
  }
})
</script>

<style scoped>
.create-post-page >>> .uploader {
  height: 200px;
  cursor: pointer;
}
.create-post-page img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
