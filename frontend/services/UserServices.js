import Api from './Api'

export default {
  index (listQuery) {
    return Api().get('user/index', {
      params: { listQuery }
    })
  },
  post (item) {
    return Api().post('user', item)
  },
  put (item) {
    return Api().put('user/:itemId', item)
  },
  // delete(item) {
  //   return Api().delete(`conference/${item.id}`, item)
  // },
  manyDelete (items) {
    return Api().delete('user/manyDelete', { data: items })
  }
  // manyRemove(items) {
  //   return Api().delete('conferenceMany/manyRemove', { data: items })
  // },
  // manyRestore(items) {
  //   return Api().put('conferenceMany/manyRestore', items)
  // }
}
