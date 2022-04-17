<template>
  <div class="publish-area">
    <div class="publish-title">评论</div>
    <div class="publish-content">
      <app-avatar v-bind="user" myself />
      <textarea v-model="inputText" :placeholder="placeText" />
    </div>
    <div class="publish-toolbar">
      <app-emotion />
      <button :disabled="!canReply" class="reply-btn"> 回帖</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '/src/store/user'
import AppEmotion from '/src/components/AppEmotion/index.vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: { type: String },
  placeText: { type: String },
})

const user = useUserStore()
const inputText = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const canReply = computed(() => {
  return user.hadLogin && props.modelValue
})
</script>

<style lang="scss" scoped>
.publish-area {
  padding: 16px 28px;
  margin-bottom: 12px;
  background-color: white;
  border: 1px solid #e0e0e0;

  & > .publish-title {
    width: 40px;
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
    width: calc(98% - 60px);
    height: 48px;
    padding: 1%;
    margin-left: 22px;
    font-size: 14px;
    resize: none;
    border: none;
    border-radius: 4px;
    //overflow-y: hidden;
    outline: none;
  }

  & > .publish-toolbar {
    display: flex;
    align-items: center;

    & > .reply-btn {
      width: 72px;
      height: 36px;
      margin-right: 16px;
      margin-left: auto;
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
</style>
