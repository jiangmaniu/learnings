import { createStore, Commit } from 'vuex'
import axios from 'axios'

export interface ResponseType<T = {}> {
  code: number;
  message: string;
  data: T;
}

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  nackName?: string;
  avatar?: ImageProps;
  createAt?: string;
  description?: string;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

// interface ListProps<T> {
//   [id: string]: T
// }

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createAt?: string;
  fitUrl?: string;
}

export interface PostProps {
  _id?: string;
  excerpt?: string;
  title: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
}

// type PostsProps = {
//   post: string,
//   aaa: string
// }

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const rs = await axios.get(url)
  commit(mutationName, rs.data)
  return rs.data
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const rs = await axios.post(url, payload)
  commit(mutationName, rs.data)
  return rs.data
}

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false }
  },
  getters: {
    getColumnById: state => (id: string) => {
      return state.columns.find(column => column._id === id)
    },
    getPostsByCid: state => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    },
    getPostById: state => (id: string) => {
      return state.posts.find(post => post._id === id)
    }
  },
  mutations: {
    setLoading (state, data: boolean) {
      state.loading = data
    },
    setUser (state, data: object) {
      state.user = { ...state.user, ...data }
    },
    createPost (state, data: PostProps) {
      state.posts.push(data)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      rawData.data.list.forEach((post: PostProps) => {
        const index = state.posts.findIndex(oldPost => oldPost._id === post._id)
        if (index < 0) {
          state.posts.push(post)
          console.log(state.posts)
        }
      })
    },
    login (state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    logout (state) {
      state.token = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    },
    fetchCurrentUser (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    fetchPost (state, rawData) {
      const data = rawData.data
      const index = state.posts.findIndex(post => post._id === data._id)
      if (index >= 0) {
        state.posts[index] = data
      } else {
        state.posts.push(data)
      }
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      return getAndCommit('/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      return getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      return getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    fetchPost ({ state, commit }, postId) {
      // if (state.posts.findIndex(post => post._id === postId) <= 0) {
      // }
      return getAndCommit(`/posts/${postId}`, 'fetchPost', commit)
    },
    fetchCurrentUser ({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    createPost ({ commit }, payload) {
      return postAndCommit('/posts', 'createPost', commit, payload)
    },
    loginAndFetch ({ dispatch }, payload) {
      return dispatch('login', payload).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  }
})

export default store
