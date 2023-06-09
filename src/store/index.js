import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'USER-KEY'
export default new Vuex.Store({
  state: {
    // 一个对象 存储当前登录用户信息(token等数据)
    user: getItem(TOKEN_KEY),
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    userPhoto: require('@/assets/微信图片_20230423201325.jpg') // 默认头像
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止本地刷新，token消失，我们需要备份到本地存储
      setItem(TOKEN_KEY, state.user)
    },
    USER_PHOTO (state, value) {
      state.userPhoto = value
    }
  },
  actions: {
  },
  modules: {
  }
})
