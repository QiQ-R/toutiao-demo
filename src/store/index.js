import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 状态 数据
  state: {
    token: JSON.parse(localStorage.getItem('token')) || ''
  },
  getters: {
  },
  // 操作数据
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', JSON.stringify(token))
    }
  },
  actions: {
  },
  modules: {
  }
})
