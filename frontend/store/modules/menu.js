// import Api from "../services/Api"
import MenuServices from '@/services/MenuServices'
const getDefaultState = () => {
  return {
    portalMenus: [],
    adminMenus: [
      {
        id: 1,
        action: 'dashboard',
        title: 'Хяналт',
        shortTitle: 'Админ удирдлагын бүх төрлийн хяналтын мэдээлэл',
        items: [
          { id: 1, title: 'Хянах самбар', to: '/dashboard', name: 'dashboard', icon: 'line-chart' }
        ]
      },
      {
        id: 2,
        action: 'content',
        title: 'Мэдээний удирдлага',
        shortTitle: 'Админ удирдлагын үндсэн бүртгэлүүд',
        items: [
          { id: 1, title: 'Мэдээ', to: '/content', name: 'content' },
          { id: 2, title: 'Хаягын дэлгэрэнгүй', to: '/address', name: 'address' },
          { id: 3, title: 'Санал', to: '/comments', name: 'comments' }
        ]
      },
      {
        id: 3,
        action: 'newsType',
        title: 'Админы удирдлага',
        shortTitle: 'Админ удирдлагын туслах бүртгэлүүд',
        items: [
          { id: 1, title: 'Цэс', to: '/menu', name: 'menu' },
          { id: 2, title: 'Хэрэглэгч', to: '/user', name: 'user' },
          { id: 3, title: 'Категори', to: '/category', name: 'category' }
        ]
      }
    ]
  }
}
export default {
  state() {
    return getDefaultState()
  },
  mutations: {
    SET_MAIN_MENU: (state, data) => {
      state.portalMenus = data
    }
  },
  actions: {
    main_menu_list ({ commit, state }) {
      if (!state.portalMenus || state.portalMenus.length === 0) {
        MenuServices.cascadeList().then((response) => {
          commit('SET_MAIN_MENU', response.data)
        })
      }
    },
    admin_menu_list ({ commit, state }, data) {
      // console.log(data.roleId, state.adminMenus, 'admin_menu_list')
      // if (data.roleId === 2) {
      //   // const menu = state.adminMenus
      //   const parentArray = []
      //   for (const i of state.adminMenus) {
      //     if (i.action === 'dashboard' || i.action === 'content') {
      //       parentArray.push(i)
      //     }
      //   }
      //   const array = []
      //   for (const item of parentArray) {
      //   console.log(array, ' arrayarrayarrayarrayarrayarray')
      // }
      // if (!state.portalMenus || state.portalMenus.length === 0) {
      //   MenuServices.cascadeList().then((response) => {
      //     commit('SET_MAIN_MENU', response.data)
      //   })
      // }
    }
  }
}
