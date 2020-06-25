import Api from './Api'

export default {
  index (listQuery) {
    return Api().get('menu/index', {
      params: { listQuery }
    })
  },
  cascadeList () {
    return Api().get('menu/cascadeList')
  },
  post (item) {
    return Api().post('menu/post', item)
  },
  put (item) {
    return Api().put('menu/update', item)
  },
  findById (item) {
    return Api().get('menu/findById', {
      params: { item: item.value }
    })
  },
  manyDelete (items) {
    return Api().delete('menu/manyDelete', { data: items })
  },
  manyDeleteHelpMenu (items) {
    return Api().delete('menu/manyDeletehelpMenu', { data: items })
  },
  getViewType (listQuery) {
    return Api().get('menuViewType/index', {
      params: { listQuery }
    })
  }
}
