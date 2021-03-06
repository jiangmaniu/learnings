<template>
  <div class="d-flex align-items-center">
    <img class="img-thumbnail rounded-circle" :src="fitUrl">
    <div class="ms-2">
      <h6 class="mb-0">{{author.nickName}}</h6>
      <span>{{author.description}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { generateFitUrl } from '../utils/helper'
import { UserProps } from '@/store'
export default defineComponent({
  name: 'UserProfile',
  props: {
    author: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup (props) {
    const fitUrl = computed(() => {
      console.log(props.author)
      if (props.author instanceof Object) {
        generateFitUrl(props.author, 50, 50)
        const { avatar } = props.author
        return avatar && avatar.fitUrl
      } else {
        return ''
      }
    })

    return {
      fitUrl
    }
  }
})
</script>

<style scoped>
.img-thumbnail {
  width: 50px;
  height: 50px;
}
</style>
