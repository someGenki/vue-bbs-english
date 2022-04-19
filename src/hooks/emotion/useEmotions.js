import emotionList from './emotion-list'

const wxReg = /\[wx_([\u4E00-\u9FA5]{1,3})]/

function processWx(str, klass = 'wx-emoji') {
  return str.replace(wxReg, (_, word) => {
    const index = emotionList.weChatList.indexOf(word)
    return index !== -1
      ? `<img class="${klass}" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" alt="">`
      : _
  })
}

export function useEmotion() {
  return { processWx }
}

/**
 * emotions中的热门😃来自 [EMOJIAll](https://www.emojiall.com/zh-hans/top-daily/zh-hans)
 */

const emotions = {
  wx: {
    list: emotionList.weChatList,
    name: '微信表情',
    process: processWx,
    getFirst:null,
  },
  emoji: {
    name: '热门😃',
    list: emotionList.emojiList,
  },
  kaomoji: {
    name: '颜文字',
    list: emotionList.kaomojiList,
  },
}

export function useEmotions1(type) {
  if (type === 'wechat') {
    let arr = []
    emotionList.weChatList.map((item, index) =>
      arr.push({
        name: `[${item}]`,
        url: `<img title="${item}" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`,
      })
    )
    return arr
  } else if (type === 'kaomoji') {
    return emotionList.kaomojiList
  } else return null
}
