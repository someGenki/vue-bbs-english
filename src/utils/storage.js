import Cookies from 'js-cookie'
//docs https://www.npmjs.com/package/js-cookie

const KEY_PREFIX = 'Y-'
const KEY_TOKEN = 'BBS-TOKEN'
const invalids = [undefined, null, 'undefined', 'null']

export function getToken() {
  return Cookies.get(KEY_TOKEN)
}

export function setToken(token) {
  Cookies.set(KEY_TOKEN, token, { expires: 7 })
}

export function removeToken() {
  return Cookies.remove(KEY_TOKEN)
}

export function get(key) {
  return localStorage.getItem(KEY_PREFIX + key)
}

export function set(key, val) {
  localStorage.setItem(KEY_PREFIX + key, val)
}

export function remove(key) {
  localStorage.removeItem(KEY_PREFIX + key)
}
