import Api from './Api'

export default {
  index () {
    return Api().get('/categorycount/index')
  }
}
