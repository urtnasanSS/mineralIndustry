import Api from './Api'

export default {
  index (listQuery) {
    return Api().get('banner/index', {
      params: { listQuery }
    })
  },
  post (item) {
    return Api().post('banner/post', item)
  },
  put (item) {
    return Api().put('banner/update', item)
  },
  // delete(item) {
  //   return Api().delete(`conference/${item.id}`, item)
  // },
  manyDelete (items) {
    return Api().delete('banner/manyDelete', { data: items })
  },
  manyRemove(items) {
    return Api().delete('banner/manyRemove', { data: items })
  },
  manyRestore(items) {
    return Api().put('banner/manyRestore', items)
  }
}
