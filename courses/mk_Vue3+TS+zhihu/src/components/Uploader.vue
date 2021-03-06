<template>
  <div class="file-upload">
    <input ref="fileRef" type="file" name="file" @change.prevent="handleFileChange" class="d-none">
    <div class="file-upload-container" @click="onClickSelectFile" v-bind="$attrs">
      <!-- 正在上传 -->
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" desabled>正在上传</button>
      </slot>

      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primar">上传成功</button>
      </slot>

      <!-- 默认样式 -->
      <slot v-else name="default">
        <button class="btn btn-primar">点击上传</button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref, PropType, watch } from 'vue'

type BeforeUploadCheckFun = (file: File) => boolean
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'

export default defineComponent({
  name: 'Uploader',
  props: {
    actions: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<BeforeUploadCheckFun>
    },
    uploaded: {
      type: Object
    }
  },
  inheritAttrs: false,
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup (props, context) {
    const fileRef = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
    const uploadedData = ref(props.uploaded)
    watch(() => props.uploaded, (newVal) => {
      fileStatus.value = 'success'
      uploadedData.value = newVal
    })
    const onClickSelectFile = () => {
      if (fileRef.value) {
        fileRef.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        // 调用上传前的钩子
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            return
          }
        }

        fileStatus.value = 'loading'
        const uploadFile = files[0]
        const formData = new FormData()
        formData.append(uploadFile.name, uploadFile)

        axios.post(props.actions, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(resp => {
          uploadedData.value = resp.data
          fileStatus.value = 'success'
          context.emit('file-uploaded', resp.data)
        }).catch(error => {
          fileStatus.value = 'error'
          context.emit('file-uploaded-error', error)
        }).finally(() => {
          if (fileRef.value) {
            fileRef.value.value = ''
          }
        })
      }
    }

    return {
      uploadedData,
      fileRef,
      fileStatus,
      onClickSelectFile,
      handleFileChange
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
