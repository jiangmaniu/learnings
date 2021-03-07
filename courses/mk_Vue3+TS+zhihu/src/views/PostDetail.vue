<template>
  <div class="post-detail w-75 mx-auto">
    <Model
      title="删除文章"
      :visible="modelIsVisible"
      @on-cancel="modelIsVisible = false"
      @on-confirm="hideAndDelete"
    >
      <p>是否删除该文章?</p>
    </Model>
    <img v-if="currentTitleImage" :src="currentTitleImage" class='my-4 rounded-lg img-fluid'>
    <div class="post-title" v-if="currentPost">
      <h2>{{currentPost.title}}</h2>
      <div class="info d-flex align-items-center py-3 mb-5 border-top border-bottom">
        <div class="col">
          <UserProfile :author="currentPost.author"></UserProfile>
        </div>
        <div class="col text-end release-time">{{currentPost.createdAt}}</div>
      </div>
      <div class="post-content" v-html="currentHtml"></div>
      <div v-if="showEidtArea" class="btn-group mt-5">
        <router-link
          :to="{name: 'CreatePost', query: { id: currentPost._id }}"
          type="button"
          class="btn btn-success"
        >编辑</router-link>
        <button type="button" class="btn btn-danger" @click.prevent="modelIsVisible = true">删除</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps, ImageProps, PostProps, UserProps, ResponseType } from '@/store'
import UserProfile from '../components/UserProfile.vue'
import { computed, defineComponent, onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Model from '../components/Model.vue'
import createMessage from '@/components/createMessage'
export default defineComponent({
  name: 'PostDetail',
  components: {
    UserProfile,
    Model
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const router = useRouter()
    const postId = route.params.id
    const modelIsVisible = ref(false)
    const md = new MarkdownIt()
    onMounted(() => {
      store.dispatch('fetchPost', postId)
    })
    const currentPost = computed<PostProps>(() => store.getters.getPostById(postId))
    const showEidtArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps
        return postAuthor._id === _id
      }
      return false
    })
    const currentTitleImage = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      }
      return ''
    })
    const currentHtml = computed(() => {
      const { content } = currentPost.value
      if (content) {
        return md.render(content)
      }
      return ''
    })
    const hideAndDelete = () => {
      modelIsVisible.value = false
      store.dispatch('deletePost', postId).then((rawData: ResponseType<PostProps>) => {
        createMessage('删除成功，2秒后跳转专栏首页', 'success')
        setTimeout(() => {
          console.log(rawData)
          router.push({ name: 'Column', params: { id: rawData.data.column } })
        }, 2000)
      })
    }
    return {
      hideAndDelete,
      modelIsVisible,
      showEidtArea,
      currentHtml,
      currentPost,
      currentTitleImage
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
