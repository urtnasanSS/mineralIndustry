import Api from './Api'

export default {
  index (listQuery) {
    return Api().get('onlinecount/index', {
      params: { listQuery }
    })
  },
  incrementCount () {
    return Api().get('/onlinecount/incrementCount')
  }
}
