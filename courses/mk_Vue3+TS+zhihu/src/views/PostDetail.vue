<template>
  <div class="post-detail w-75 mx-auto">
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
        <!-- <router-link type="button" class="btn btn-danger">删除</router-link> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps, ImageProps, PostProps, UserProps } from '@/store'
import UserProfile from '../components/UserProfile.vue'
import { computed, defineComponent, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'PostDetail',
  components: {
    UserProfile
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const postId = route.params.id
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
    return {
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
