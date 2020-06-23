import https from 'https'
import { getToken, getCookie } from '@/utils/auth'
// import { isObjectID } from '@/utils/Helper'
export default (aaa) => {
  const { app, store, req } = aaa
  app.router.beforeEach((to, from, next) => {
    const loggedToken = process.server ? getCookie('sfdsafd-token', req.headers.cookie) : getToken()
    if (loggedToken) {
      // app.$axios.defaults.baseURL = process.env.baseUrl
      // server uurluugee domain hayagaar handahgui bsn uchir zasaw
      if (process.server) {
        app.$axios.defaults.baseURL = 'http://localhost:8083'
      } else {
        app.$axios.defaults.baseURL = process.env.baseUrl
      }
      app.$axios.defaults.headers.common.Authorization = 'Bearer ' + loggedToken
      app.$axios.defaults.headers.post['Content-Type'] = 'application/json'
      app.$axios.httpsAgent = new https.Agent({
        keepAlive: true
      })
      if (!store.getters.userKey || store.getters.userKey.token !== loggedToken) {
        app.$axios.get('user/info').then((c) => {
          const userKey = Object.assign({}, c.data, { token: loggedToken })
          store.dispatch('SetUserInfo', userKey)
          setTimeout(function () { next() }, 20)
        }).catch((e) => {
          console.log('SetUserInfo error', e)
          store.dispatch('SetUserInfo', null)
          next()
        })
      } else {
        setTimeout(function () { next() }, 20)
      }
    } else {
      store.dispatch('SetUserInfo', null)
      next()
    }
  })
}
