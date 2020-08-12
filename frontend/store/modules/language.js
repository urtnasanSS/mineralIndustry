const getDefaultState = () => {
  return {
    language: {
      name: 'Монгол',
      code: 'mn',
      iso: 'mn-MN',
      file: 'mn-MN.js'
    }
  }
}
export default {
  state() {
    return getDefaultState()
  },
  mutations: {
    SET_Language: (state, data) => {
      state.language = data
    }
  },
  actions: {
    SetLanguageInfo({ commit }, data) {
      return new Promise((resolve) => {
        if (data && data.code) {
          commit('SET_Language', data)
          resolve()
        } else {
          commit('SET_Language', null)
        }
      })
    }
  }
}
