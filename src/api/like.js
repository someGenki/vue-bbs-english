import http from '/src/utils/request'

export function isLike(itemType, itemId) {
  return http.get(`/isliked/${itemType}/${itemId}`)
}

export function doLike(itemType, itemId) {
  return http.get(`/like/${itemType}/${itemId}`)
}

export function doUnlike(itemType, itemId) {
  return http.get(`/unlike/${itemType}/${itemId}`)
}

export function doHate(itemType, itemId) {
  return http.get(`/hate/${itemType}/${itemId}`)
}
