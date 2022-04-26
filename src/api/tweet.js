import http from '/src/utils/request'

export function postTweet(content) {
  return http.post('/tweet/post', { content })
}

export function getTweets(uid = 0) {
  return http.get('/tweet/list/' + uid)
}

export function delTweets(tid) {
  return http.delete('/tweet/del/' + tid)
}
