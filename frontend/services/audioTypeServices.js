import Api from './Api'

export default {
  index (listQuery) {
    return Api().get('audio/index', {
      params: { listQuery }
    })
  },
  post (item) {
    return Api().post('audio/post', item)
  },
  put (item) {
    return Api().put('audio/put', item)
  },
  manyDelete (items) {
    return Api().delete('audio/manyDelete', { data: items })
  }
}
