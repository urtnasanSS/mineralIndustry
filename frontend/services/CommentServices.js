import Api from './Api'

export default {
  index (id, listQuery) {
    return Api().get('comment/index', {
      params: { id, listQuery }
    })
  },
  post (item) {
    return Api().post('comment/post', item)
  },
  put (item) {
    return Api().put('comment/update', item)
  },
  // delete(item) {
  //   return Api().delete(`conference/${item.id}`, item)
  // },
  manyDelete (items) {
    return Api().delete('comment/manyDelete', { data: items })
  },
  show (listQuery) {
    return Api().get('comment/show', {
      params: { listQuery }
    })
  }
}
