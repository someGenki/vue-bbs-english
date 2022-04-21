import http from '/src/utils/request'
import { getCommentList } from './comment'

export function getPost(num, size, category) {
  if (!category) return http.get(`/post/page?num=${num}&size=${size}`)
  else
    return http.get(`/post/page?category=${category}&num=${num}&size=${size}`)
}

export function getPostComments(num, size, postId) {
  if (isNaN(num) || isNaN(size)) return
  return getCommentList(4, postId, num, size)
}

export function getPostDetail(pid) {
  return http.get('/post/' + pid)
}

export function pubPost(form) {
  return http.post('/post/commit', form)
}

// 发布-编辑帖子 http://47.100.95.40:8080/api/doc.html#/default/%E5%B8%96%E5%AD%90%E6%A8%A1%E5%9D%97/publishUsingPOST_1
