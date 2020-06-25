import Api from './Api'

export default {
  index (listQuery) {
    return Api().get('webButton/index', {
      params: { listQuery }
    })
  },
  post (item) {
    return Api().post('webButton/post', item)
  },
  put (item) {
    return Api().put('webButton/update', item)
  },
  // delete(item) {
  //   return Api().delete(`conference/${item.id}`, item)
  // },
  manyDelete (items) {
    return Api().delete('webButton/manyDelete', { data: items })
  }
  // manyRemove(items) {
  //   return Api().delete('conferenceMany/manyRemove', { data: items })
  // },
  // manyRestore(items) {
  //   return Api().put('conferenceMany/manyRestore', items)
  // }
}
