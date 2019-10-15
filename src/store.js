import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showPlayer: false,
    nowMusician: {},
    albumNumber: 0,
    singleNumber: 0,
    isCanClickBackGround: true,
    NickyName: localStorage.getItem('NickyName'),
    headUrl: localStorage.getItem('headUrl'),
    userId: localStorage.getItem('userId'),
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
    changeLogin (state, user) {
      state.Authorization = user.Authorization
      state.NickyName = user.userInfo.userName
      state.headUrl = user.userInfo.headurl
      state.userId = user.userInfo.userId
      localStorage.setItem('Authorization', user.Authorization)
      localStorage.setItem('NickyName', user.userInfo.userName)
      localStorage.setItem('headUrl', user.userInfo.headurl)
      localStorage.setItem('userId', user.userInfo.userId)
    },
    //  登出
    LOGOUT: (state) => {
    //  登出的时候要清除token
      state.Authorization = null
      state.NickyName = null
      state.headUrl = null
      state.userId = null
      localStorage.removeItem('Authorization')
      localStorage.removeItem('NickyName')
      localStorage.removeItem('headUrl')
      localStorage.removeItem('userId')
    }
  },
  actions: {

  }
})
