import http from '/src/utils/request'

/**
 *     TRANSLATION(1, "翻译"),
 *     COMMENT(2, "评论"),
 *     ARTICLE(3, "文章"),
 *     POST(4, "帖子");
 */

export function getCommentList(itemType, itemId,num,size) {
  return http.get(`/comment/${itemType}/${itemId}?num=${num}&size=${size}`)
}

