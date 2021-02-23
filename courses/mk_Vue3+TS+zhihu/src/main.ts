import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import axios from 'axios'

axios.defaults.baseURL = '/api'

axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, err => {
  console.log(err.response)
  const { error } = err.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
