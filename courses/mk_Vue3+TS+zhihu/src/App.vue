<template>
  <div class="container">
    <Message v-if="error.status" type="error" :message="error.message"/>
    <Loading v-if="isLoading" text="加载中" background="rgba(0, 0, 0, .5)" />
    <GlobalHeader :user="user" />
    <router-view></router-view>
    <GlobalFooter/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
import Message from './components/Message.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import createMessage from './components/createMessage'
import Loading from './components/Loading.vue'
import axios from 'axios'

export default defineComponent({
  name: 'App',
  components: {
    GlobalFooter,
    GlobalHeader,
    Loading,
    Message
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)

    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })

    return {
      error,
      user,
      isLoading
    }
  }
})
</script>

<style>
</style>
