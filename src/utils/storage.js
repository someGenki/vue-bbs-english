import Cookies from 'js-cookie'
//docs https://www.npmjs.com/package/js-cookie

const KEY_PREFIX = 'Y-'
const KEY_TOKEN = 'BBS-TOKEN'
const invalids = [undefined, null, 'undefined', 'null']

export function getToken() {
  return Cookies.get(KEY_TOKEN)
}

export function setToken(token) {
  Cookies.set(KEY_TOKEN, token)
}

export function removeToken() {
  return Cookies.remove(KEY_TOKEN)
}
