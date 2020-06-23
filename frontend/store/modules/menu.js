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
          { id: 2, title: 'Баннер', to: '/banner', name: 'banner' },
          { id: 3, title: 'Слайд', to: '/slide', name: 'slide' },
          { id: 4, title: 'Хэрэгцээт холбоос', to: '/links', name: 'links' },
          { id: 5, title: 'Хаягын дэлгэрэнгүй', to: '/address', name: 'address' },
          { id: 6, title: 'Түгээмэл а/х', to: '/faq', name: 'faq' },
          { id: 7, title: 'Сэтгэгдэл', to: '/comments', name: 'comments' },
          { id: 8, title: 'Аудио', to: '/audio', name: 'audio' }
        ]
      },
      {
        id: 3,
        action: 'newsType',
        title: 'Админы удирдлага',
        shortTitle: 'Админ удирдлагын туслах бүртгэлүүд',
        items: [
          { id: 1, title: 'Мэдээний төрөл', to: '/newsType', name: 'newsType' },
          { id: 2, title: 'Цэсийн төрөл', to: '/menuType', name: 'menuType' },
          { id: 3, title: 'Цэс', to: '/menu', name: 'menu' },
          { id: 4, title: 'Баннерийн төрөл', to: '/bannerType', name: 'bannerType' },
          { id: 5, title: 'Туслах цэс', to: '/helpmenu', name: 'helpmenu' },
          { id: 6, title: 'Хэрэглэгч', to: '/user', name: 'user' },
          { id: 7, title: 'Категори', to: '/category', name: 'category' },
          { id: 8, title: 'Нүүр баттан', to: '/webButton', name: 'webButton' }
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
