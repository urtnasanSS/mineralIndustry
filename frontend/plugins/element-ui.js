import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/mn'

export default () => {
  Vue.use(Element, {
    locale,
    size: 'mini' // set element-ui default size
  })
}
