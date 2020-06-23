import Cookies from 'js-cookie'
const TokenKey = 'sfdsafd-token'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  Cookies.set(TokenKey, token, { expires: 7 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getCookie(name, cookie) {
  const value = '; ' + cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2 || parts.length === 3) {
    return parts.pop().split(';').shift()
  }
}
