import { computed } from 'vue'

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