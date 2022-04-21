import http from '/src/utils/request'

// 留言相关请求-发送请求
export function postMessage(data) {
  return http.post('/message', data)
}

// 留言相关请求-分页获取请求
export function getMessage(num, size) {
  return http.get(`/message?num=${num}&size=${size}`)
}
