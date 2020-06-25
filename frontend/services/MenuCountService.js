import Api from './Api'

export default {
  // post () {
  //   return Api().post('menuscount/post')
  // },
  index () {
    return Api().get('menuscount/index')
  }
}
