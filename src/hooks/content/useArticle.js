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

export function getDifficulty(dif) {
  const difColor = computed(() => {
    switch (dif) {
      case 1:
        return '#48dfb4'
      case 2:
        return '#eec053'
      case 3:
        return '#00A6ED'
      case 4:
        return '#FF6F59'
    }
  })

  const difText = computed(() => {
    switch (dif) {
      case 1:
        return '小学水平'
      case 2:
        return '中学水平'
      case 3:
        return '大学水平'
      case 4:
        return '商务水平'
    }
  })
  return { difColor, difText }
}
