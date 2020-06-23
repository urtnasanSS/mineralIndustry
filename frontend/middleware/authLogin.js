export default function ({ store, redirect, route }) {
  const authUser = store.state.authUser
  if (authUser) {
    return redirect('/admin/dashboard')
  }
}
