import Api from './Api'

export default {
  index (query) {
    return Api().get('search/index', {
      params: { query }
    })
  },
  post (item) {
    return Api().post('search/post', item)
  }
}
