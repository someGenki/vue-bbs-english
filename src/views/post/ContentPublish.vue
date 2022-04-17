<template>
  <div class="publish-area">
    <div class="publish-title">评论</div>
    <div class="publish-wrapper">
      <app-avatar
        v-if="user.hadLogin"
        :uid="user.uid"
        :avatar="user.avatar"
        :nickname="user.nickname"
      />
      <app-icon v-else color="gray" size="36" icon="el-icon-avatar" />
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

const props = defineProps({
  modelValue: { type: String },
  placeText: { type: String },
})
const emit = defineEmits(['update:modelValue'])

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
  height: 160px;
  padding: 16px 28px;
  margin-bottom: 12px;
  background-color: white;
  border: 1px solid #e0e0e0;

  > .publish-title {
    width: 40px;
    margin-bottom: 12px;
    font-size: 20px;
    font-weight: bold;
  }

  > .publish-wrapper {
    display: flex;
    align-items: center;
  }

  > .publish-toolbar {
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
      outline: 0;
      border: none;
      border-radius: 4px;

      &:disabled {
        cursor: not-allowed;
        background-color: #bbbbbb;
      }
    }
  }

  > .publish-wrapper > textarea {
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
}
</style>
