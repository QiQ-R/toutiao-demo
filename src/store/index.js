import Vue from 'vue'
import Vuex from 'vuex'
import {setLocal, getLocal} from '@/utils/storage.js'


Vue.use(Vuex)

export default new Vuex.Store({
  // 状态 数据
  state: {
    token: getLocal('token') 
  },
  getters: {
  },
  // 操作数据
  mutations: {
    setToken(state, token) {
      state.token = token
      setLocal('token',token)
    }
  },
  actions: {
  },
  modules: {
  }
})
