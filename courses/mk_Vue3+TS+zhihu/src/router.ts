import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Column from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import PostDetail from './views/PostDetail.vue'
import Signup from './views/Signup.vue'
import axios from 'axios'

const historyRouter = createWebHistory()
const router = createRouter({
  history: historyRouter,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        redirectAlreadyLogin: true
      },
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      meta: {
        redirectAlreadyLogin: true
      },
      component: Signup
    },
    {
      path: '/column/:id',
      name: 'Column',
      component: Column
    },
    {
      path: '/create-post',
      name: 'CreatePost',
      meta: {
        requiredLogin: true
      },
      component: CreatePost
    },
    {
      path: '/post/:id',
      name: 'PostDetail',
      component: PostDetail
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { redirectAlreadyLogin, requiredLogin } = to.meta
  if (user.isLogin) {
    // 已登录需要判断路由权限
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  } else {
    // 登录
    if (token) {
      // 获取用户数据
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(err => {
        console.error(err)
        store.commit('logout')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  }
})

export default router
