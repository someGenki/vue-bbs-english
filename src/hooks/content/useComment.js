import { inject, isRef, ref } from 'vue'

//
/**
 * const { switchShow, showReply,inputText } = useComment()
 *  <!--评论输入框-->
 *  <content-publish
 *    v-if="showReply"
 *    v-model="inputText"
 *    :compact="true"
 *    :auto-focus="true"
 *    :place-text="placeText"
 *    @reply="handleReply"
 *  />
 */
export function useComment() {
  const showReply = ref(false)
  const itemType = inject('itemType')
  const inputText = ref('')
  const uniReply = inject('uniReply') // refImpl! 注意要先注入一个ref实例
  const switchShow = () => {
    const another = uniReply.value
    if (!showReply.value) {
      if (isRef(another)) {
        another.value = false // 关闭另一个展开的回复框
      }
      showReply.value = true // 打开当前回复框
      uniReply.value = showReply // 记得当前打开回复框的ref
    } else {
      uniReply.value = null
      showReply.value = false
    }
  }
  return { inputText, showReply, itemType, switchShow }
}
