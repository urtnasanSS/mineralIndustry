export default function ({ store, redirect, route }) {
  if (!store.getters.userKey) {
    redirect('/login')
  } else if (store.getters.userKey.requiredChangePassword) {
    redirect('/admin/dashboard')
  } else if (store.getters.userKey) {
    store.dispatch('admin_menu_list', store.getters.userKey)
  }
}
