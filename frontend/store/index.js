import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import language from './modules/language'
import getters from './getters.js'
const createStore = () => {
  return new Vuex.Store({
    modules: {
      user, menu, language
    },
    getters
  })
}
export default createStore
