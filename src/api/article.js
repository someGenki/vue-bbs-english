import http from '/src/utils/request'

// 发布/编辑一个文章
export function commitArticle(form) {
  return http.post('/article/commit', form)
}

// 获取文章list
export function getArticleList(num = 1, size = 5, search = '') {
  let tmp = search === 'default' ? '' : `&search=${search}`
  return http.get(`/article/page?num=${num}&size=${size}` + tmp)
}

// 获取一个文章详细内容
export function getArticle(aid) {
  return http.get('/article/' + aid)
}

// 获取用户发表过的文章
export function getUserArticle(uid) {
  return http.get(`/article/user/${uid}`)
}

// 删除一篇文章
export function delArticle(aid) {
  return http.get(`/article/del/${aid}`)
}

// 翻译单个单词
export function translate(word) {
  return http.get('/api/' + word)
}
