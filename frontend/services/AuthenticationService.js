import Api from '@/services/Api'

export default {
  loginEdoc() {
    return Api().get('loginEdoc')
  },
  login(credentials) {
    return Api().post('login', credentials)
  },
  logout() {
    return Api().get('user/logout')
  },
  info() {
    return Api().get('user/info')
  }
}
