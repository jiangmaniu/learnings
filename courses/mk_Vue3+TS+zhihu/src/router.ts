import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Column from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import Signup from './views/Signup.vue'

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
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = store.state.token

  if (to.meta.requiredLogin && token) {
    next('/login')
  } else if (to.meta.redirectAlreadyLogin && token) {
    next('/')
  }

  next()
})

export default router
