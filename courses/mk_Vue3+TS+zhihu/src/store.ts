import { createStore, Commit } from 'vuex'
import axios from 'axios'

export interface UserProps {
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
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

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

interface ImageProps {
  _id?: string;
  url?: string;
  createAt?: string;
}

export interface PostProps {
  _id: string;
  excerpt?: string;
  title: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}

// type PostsProps = {
//   post: string,
//   aaa: string
// }

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const rs = await axios.get(url)
  commit(mutationName, rs.data)
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const rs = await axios.post(url, payload)
  commit(mutationName, rs.data)
}

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: {}
  },
  getters: {
    getColumnById: state => (id: string) => {
      return state.columns.find(column => column._id === id)
    },
    getPostsByCid: state => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
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
      state.posts = rawData.data.list
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
      axios.defaults.headers.common.Authorization = ''
    },
    fetchCurrentUser (state, rawData) {
      state.user = rawData.data
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
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
    fetchCurrentUser ({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    loginAndFetch ({ dispatch }, payload) {
      return dispatch('login', payload).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  }
})

export default store
