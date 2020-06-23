import Api from '../../frontend/services/Api'

export default {
  index (listQuery) {
    return Api().get('category/index', {
      params: { listQuery }
    })
  },
  post (item) {
    return Api().post('category/post', item)
  },
  put (item) {
    return Api().put('category/update', item)
  },
  // delete(item) {
  //   return Api().delete(`conference/${item.id}`, item)
  // },
  manyDelete (items) {
    return Api().delete('category/manyDelete', { data: items })
  }
  // manyRemove(items) {
  //   return Api().delete('conferenceMany/manyRemove', { data: items })
  // },
  // manyRestore(items) {
  //   return Api().put('conferenceMany/manyRestore', items)
  // }
}
