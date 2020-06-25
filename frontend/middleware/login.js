export default function ({ store, redirect }) {
  if (store.getters.userKey) {
    redirect('/admin/dashboard')
  }
}
