<template>
  <div
    @keydown.ctrl.enter="emit('reply')"
    class="content-publish publish-area"
    :class="{ compact }"
  >
    <div v-if="title" class="publish-title">{{ title }}</div>
    <div class="publish-content">
      <app-avatar v-if="showAvatar" v-bind="user" myself />
      <textarea
        :class="{ hasText: inputText }"
        autofocus
        ref="textarea"
        v-model="inputText"
        :placeholder="placeText"
      />
    </div>
    <div class="publish-toolbar">
      <!--TODO 点击表情不让textarea失去焦点-->
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
import { computed, ref } from 'vue'
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
// 获取鼠标位置
// const endPoint = textarea.selectionStart;
const handleEmotion = (text) => {
  inputText.value += text
}
</script>

<style lang="scss" scoped>
.publish-area {
  padding: 16px 28px;
  margin-bottom: 6px;
  background-color: white;

  & > .publish-title {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
  }

  & > .publish-content {
    display: flex;
    align-items: center;
    min-height: 50px;
  }

  & > .publish-content > textarea {
    width: calc(98% - 56px);
    height: 48px;
    padding: 4px;
    margin-left: 18px;
    font-size: 15px;
    resize: none;
    border: none;
    border-radius: 4px;
    outline: none;

    &:focus {
      outline: 1px solid #dcdcdc;
    }
  }

  & > .publish-toolbar {
    display: flex;
    align-items: center;
    padding-top: 4px;
    user-select: none;

    & > .reply-wrap {
      margin-left: auto;
    }

    .reply-btn {
      width: 72px;
      height: 36px;
      margin-right: 16px;
      margin-left: 6px;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
      background: #40a9ff;
      border: none;
      border-radius: 4px;
      outline: 0;

      &:disabled {
        cursor: not-allowed;
        background-color: #bbbbbb;
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
