import Api from './Api'

export default {
  index (listQuery) {
    return Api().get('links/index', {
      params: { listQuery }
    })
  },
  post (item) {
    return Api().post('links/post', item)
  },
  put (item) {
    return Api().put('links/update', item)
  },
  // delete(item) {
  //   return Api().delete(`conference/${item.id}`, item)
  // },
  manyDelete (items) {
    return Api().delete('links/manyDelete', { data: items })
  }
  // manyRemove(items) {
  //   return Api().delete('conferenceMany/manyRemove', { data: items })
  // },
  // manyRestore(items) {
  //   return Api().put('conferenceMany/manyRestore', items)
  // }
}
