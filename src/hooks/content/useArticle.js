import { computed } from 'vue'
import { getStrColor } from '/src/utils/process'

// 分割用`-`连接的标签属性，返回数组。包含名字和随机颜色
export const splitTags = (tags) => {
  tags = tags || '' // 防止返回非数组
  return tags
    .split('-')
    .map((x) => ({ name: x, color: getStrColor(x) }))
    .filter((i) => !!i.name)
}

export const difficultyLists = [
  ['小学水平', '#48dfb4'],
  ['中学水平', '#eec053'],
  ['大学水平', '#00A6ED'],
  ['商务水平', '#FF6F59'],
]

export function getDifficulty(dif) {
  // 好像不是很需要使用到computed
  const difColor = computed(() => {
    return difficultyLists[dif - 1][1]
  })

  const difText = computed(() => {
    return difficultyLists[dif - 1][0]
  })
  return { difColor, difText }
}

export const keysOfArticle = [
  'id',
  'title',
  'content',
  'tags',
  'description',
  'difficulty',
  'firstPic',
]
