import { marked } from 'marked'

const colors = [
  '#2196F3',
  '#32c787',
  '#00BCD4',
  '#ff5652',
  '#ffc107',
  '#ff85af',
  '#FF9800',
  '#39bbb0',
  '#f56a00',
  '#7265e6',
  '#ffbf00',
  '#00a2ae',
]

const element = document.createElement('p')

/**
 * 根据字符串返回随机的颜色
 * @param {String} str
 */
export function getStrColor(str) {
  if (!str) return
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = 31 * hash + str.charCodeAt(i)
  }
  return colors[Math.abs(hash % colors.length)]
}

export function getMarkdownData(markdownText) {
  const res = {}
  element.innerHTML = marked.parse(markdownText)
  res.rawText = element.innerText
  res.firstImg = element.getElementsByTagName('img')[0]?.src
  element.innerHTML = ''
  return res
}

// 获取路径中的查询参数并存入对象中
export const getParams = (fullPath) => {
  let index
  if (fullPath && (index = fullPath.indexOf('?')) > -1) {
    const usp = new URLSearchParams(fullPath.substring(index))
    return Object.fromEntries(usp.entries())
  }
}
