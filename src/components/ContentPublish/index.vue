<template>
  <div
    @keydown.ctrl.enter="emit('reply')"
    class="content-publish publish-area"
    :class="{ compact }"
  >
    <div v-if="title" class="publish-title">{{ title }}</div>
    <div class="publish-content">
      <app-avatar v-if="showAvatar" v-bind="user" need-login />
      <textarea
        :class="{ hasText: inputText }"
        autofocus
        ref="textarea"
        v-model="inputText"
        :placeholder="placeText"
        @blur="handleBlur"
      />
    </div>
    <div class="publish-toolbar">
      <app-emotion @emotion="handleEmotion" />
      <div class="reply-wrap">
        <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
        <button
          @keydown.ctrl.enter="emit('reply')"
          @click="emit('reply')"
          :disabled="!canReply"
          class="reply-btn"
        >
          回&nbsp;复
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, provide, ref } from 'vue'
import { useUserStore } from '/src/store/user'
import AppEmotion from '/src/components/AppEmotion/index.vue'

/**
 * @example <content-publish :place-text="placeText" v-model="inputText" />
 */
const emit = defineEmits(['update:modelValue', 'reply'])
const props = defineProps({
  title: { type: String }, // 左上文本
  placeText: { type: String }, // 提示文本
  modelValue: { type: String }, // 双向绑定
  unique: { type: Boolean, default: false }, // 唯一展开
  compact: { type: Boolean, default: false }, // 更加紧凑
  showAvatar: { type: Boolean, default: true }, // 显示头像
})

const user = useUserStore()
const textarea = ref(null)

const inputText = computed({
  get: () => props.modelValue || '',
  set: (val) => emit('update:modelValue', val),
})
const canReply = computed(() => {
  return user.hadLogin && props.modelValue
})

provide('textarea', textarea) // 注入输入框，以便子组件操作

let start = 0 // 失焦时记录光标位置
const handleBlur = () => {
  start = textarea.value.selectionStart
}
// 将表情添加到输入框的光标处
const handleEmotion = (text) => {
  const str = inputText.value
  inputText.value = str.substring(0, start) + text + str.substring(start)
  nextTick(() => {
    textarea.value.focus() // nextTick的作用是保证插入字符后，光标仍在合适的位置且不失去焦点
    textarea.value.setSelectionRange(start + text.length, start + text.length)
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.publish-area {
  padding: 16px 28px;
  margin-bottom: 6px;
  background-color: #ffffff;

  & > .publish-title {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
  }

  & > .publish-content {
    display: flex;
    align-items: center;
    min-height: 50px;
    margin-right: 18px;

    & > textarea {
      width: 100%;
      height: 48px;
      padding: 4px;
      margin-left: 18px;
      font-size: 15px;
      resize: none;
      user-select: none;
      border: none;
      border-radius: 4px;
      outline: none;

      &:focus {
        outline: 1px solid #dcdcdc;
      }
    }
  }

  & > .publish-toolbar {
    display: flex;
    align-items: center;
    padding-top: 4px;
    margin-right: 18px;
    user-select: none;

    & > .reply-wrap {
      margin-left: auto;
    }

    .reply-btn {
      width: 72px;
      height: 36px;
      margin-left: 6px;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
      background: $button-bg;
      border: none;
      border-radius: 4px;
      outline: 0;

      &:disabled {
        cursor: not-allowed;
        background-color: $disabled-bg;
      }
    }
  }
}

// 更加紧凑
.publish-area.compact {
  padding: 2px 4px;
  margin-bottom: 0;

  .reply-btn {
    width: 62px;
    height: 28px;
  }
}
</style>
