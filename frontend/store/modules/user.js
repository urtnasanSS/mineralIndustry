import { setToken, removeToken } from '@/utils/auth'
// import AuthenticationService from '@/services/AuthenticationService'
const getDefaultState = () => {
  return {
    userKey: null
  }
}
export default {
  state() {
    return getDefaultState()
  },
  mutations: {
    USER_RESET_STATE: (state) => {
      Object.assign(state, getDefaultState())
    },
    SET_USER_KEY: (state, userKey) => {
      state.userKey = userKey
    },
    SET_CHANGED_PASSWORD: (state) => {
      state.userKey.requiredChangePassword = false
    }
  },
  actions: {
    SetUserInfo({ commit }, data) {
      return new Promise((resolve) => {
        if (data && data.token) {
          setToken(data.token)
          commit('SET_USER_KEY', data)
          resolve()
        } else {
          commit('SET_USER_KEY', null)
        }
      })
    },
    user_logout({ commit }) {
      commit('USER_RESET_STATE')
      removeToken()
      // return new Promise((resolve, reject) => {
      //   AuthenticationService.logout().then((c) => {
      //     if (c.data.status === 1) {
      //       commit('USER_RESET_STATE')
      //       removeToken()
      //       resolve()
      //     } else {
      //       reject(new Error('unsuces'))
      //     }
      //   }).catch((e) => {
      //     reject(new Error(e))
      //   })
      // })
    },
    SetChangedPassword({ commit }) {
      commit('SET_CHANGED_PASSWORD')
    }
  }
}
