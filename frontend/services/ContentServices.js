import Api from './Api'

export default {
  index (listQuery) {
    return Api().get('content/index', {
      params: { listQuery }
    })
  },
  indexAdmin (listQuery) {
    return Api().get('content/indexAdmin', {
      params: { listQuery }
    })
  },
  post (item) {
    return Api().post('content/post', item)
  },
  put (item) {
    return Api().put('content/update', item)
  },
  putSpecial (item) {
    return Api().put('content/updateSpecial', item)
  },
  putStopPress (item) {
    return Api().put('content/updateStopPress', item)
  },
  getContentById (id) {
    return Api().get('content/getContentById', { params: { id } })
  },
  incrementCount (id) {
    return Api().get('content/incrementCount', { params: { id } })
  },
  // delete(item) {
  //   return Api().delete(`conference/${item.id}`, item)
  // },
  manyDelete (items) {
    return Api().delete('content/manyDelete', { data: items })
  },
  manyRemove(items) {
    return Api().delete('conferenceMany/manyRemove', { data: items })
  },
  manyRestore(items) {
    return Api().put('conferenceMany/manyRestore', items)
  }
}
