<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">麻妞专栏</router-link>
    <ul v-if="!token" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登录</router-link></li>
      <li class="list-inline-item"><router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <DropDown :title="`你好，${user.nickName}`" close-on-content-click>
          <DropDownItem><router-link to="/create-post" class="dropdown-item">新建文章</router-link></DropDownItem>
          <DropDownItem><router-link :to="`/column/${user.column}`" class="dropdown-item">我的专栏</router-link></DropDownItem>
          <DropDownItem disabled><a href="#" class="dropdown-item">编辑资料</a></DropDownItem>
          <DropDownItem><button class="dropdown-item" @click="onClickLogout">退出登录</button></DropDownItem>
        </DropDown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
import { GlobalDataProps, UserProps } from '@/store'
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    DropDown,
    DropDownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()

    const token = computed(() => store.state.token)
    const onClickLogout = () => {
      store.commit('logout')
      router.push('/login')
    }

    return {
      token,
      onClickLogout
    }
  }
})
</script>

<style lang='scss' scoped>

</style>
