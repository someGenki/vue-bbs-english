import http from '/src/utils/request'

export function getTopUser() {
  return http.get('/rank?by=point&type=user')
}

export function getRank(by, type) {
  return http.get(`/rank?by=${by}&type=${type}`)
}

export function getSearch(keyword) {
  return http.get(`search?search=${keyword}`)
}
