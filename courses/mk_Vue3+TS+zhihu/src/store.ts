import { createStore, Commit } from 'vuex'
import { arrToObj } from './utils/helper'
import axios, { AxiosRequestConfig } from 'axios'

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

interface LoadedProps {
  columnId: string;
  total: number;
  currentPage: number;
}

export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  columns: {
    data: ListProps<ColumnProps>;
    currentPage: number;
    total: number;
  };
  posts: {
    data: ListProps<PostProps>;
    loadedColumns: ListProps<LoadedProps>;
  };
  user: UserProps;
}

interface ListProps<T> {
  [id: string]: T;
}

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

const asyncAndCommit = async (url: string, mutationName: string, commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
  const rs = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data: rs.data, extraData })
  } else {
    commit(mutationName, rs.data)
  }
  return rs.data
}

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, loadedColumns: {} },
    user: { isLogin: false }
  },
  getters: {
    getColumns: state => Object.values(state.columns.data),
    getColumnById: state => (id: string) => {
      return state.columns.data[id]
    },
    getPostsByCid: state => (cid: string) => {
      return Object.values(state.posts.data).filter(post => post.column === cid)
    },
    getPostById: state => (id: string) => {
      return state.posts.data[id]
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
      if (data._id) {
        state.posts.data[data._id] = data
      }
    },
    fetchColumns (state, rawData) {
      const { columns } = state
      const { list, currentPage, count } = rawData.data
      state.columns = {
        data: { ...columns.data, ...arrToObj(list) },
        currentPage,
        total: count
      }
    },
    fetchColumn (state, rawData) {
      state.columns.data[rawData.data._id] = rawData.data
    },
    fetchPosts (state, { data: rawData, extraData: columnId }) {
      console.log(rawData.data.list)
      const { list, count, currentPage } = rawData.data
      state.posts.data = { ...state.posts.data, ...arrToObj(list) }
      const loadedData = {
        columnId,
        total: count,
        currentPage: currentPage
      }
      state.posts.loadedColumns[columnId] = loadedData
    },
    updatePost (state, rawData) {
      state.posts.data[rawData.data._id] = rawData.data
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
      state.posts.data[rawData.data._id] = rawData.data
    },
    deletePost (state, rawData) {
      delete state.posts.data[rawData.data._id]
    }
  },
  actions: {
    fetchColumns ({ state, commit }, params = {}) {
      const { currentPage = 1, pageSize = 5 } = params
      if (state.columns.currentPage < currentPage) {
        return getAndCommit(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
      }
    },
    fetchColumn ({ state, commit }, cid) {
      if (!state.columns.data[cid]) {
        return getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
      }
    },
    fetchPosts ({ state, commit }, { columnId: cid, pageSize = 4, currentPage = 1 }) {
      const loadedData = state.posts.loadedColumns[cid]
      if (!loadedData || loadedData.currentPage < currentPage) {
        return asyncAndCommit(`/columns/${cid}/posts?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchPosts', commit, { method: 'get' }, cid)
      }
    },
    fetchPost ({ state, commit }, postId) {
      const currentPost = state.posts.data[postId]
      if (!currentPost || !currentPost.content) {
        return getAndCommit(`/posts/${postId}`, 'fetchPost', commit)
      } else {
        return Promise.resolve({ data: currentPost })
      }
    },
    updatePost ({ commit }, { id, payload }) {
      return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, {
        method: 'patch',
        data: payload
      })
    },
    deletePost ({ commit }, postId) {
      return asyncAndCommit(`/posts/${postId}`, 'deletePost', commit, {
        method: 'delete'
      })
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
