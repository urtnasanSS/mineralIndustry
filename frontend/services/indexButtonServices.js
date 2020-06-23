import Api from './Api'

export default {
  index (listQuery) {
    return Api().get('indexButton/index', {
      params: { listQuery }
    })
  },
  post (item) {
    return Api().post('indexButton/post', item)
  },
  put (item) {
    return Api().put('indexButton/update', item)
  },
  manyDelete (items) {
    return Api().delete('indexButton/manyDelete', { data: items })
  }
}
