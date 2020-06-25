const getters = {
  userKey: state => state.user.userKey,
  adminMenus: state => state.menu.adminMenus,
  portalMenus: state => state.menu.portalMenus,
  Language: state => state.language.language
}
export default getters
