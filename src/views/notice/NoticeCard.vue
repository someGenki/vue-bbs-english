<template>
  <div class="notice-card">
    <app-icon color="#5BA1FF" size="56" class="notice-type" icon="el-icon-list"/>
    <router-link :to="notice.link" class="notice-title"
      >{{ notice.title }}
    </router-link>
    <div class="notice-content" v-html="processWx(notice.content)" />
    <div class="notice-info">
      <span class="time">{{ notice.gmtCreate }}</span>
      <span @click="emit('read')" class="read-btn">
        <app-icon size="14" icon="el-icon-circle-check" />&nbsp;已读
      </span>
    </div>
  </div>
</template>

<script setup>
import { processWx } from '../../hooks/emotion/useEmotions'

const props = defineProps({
  notice: { type: Object, required: true },
})
const emit = defineEmits(['read'])
</script>

<style lang="scss" scoped>
.notice-card {
  position: relative;
  padding: 12px 0 6px 64px;
  margin: 4px 16px;
  border-bottom: 1px solid #d0d0d0;
  &>.notice-type{
    position: absolute;
    left: -10px;
  }
  & > .notice-title {
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }

  & > .notice-content {
    margin: 6px 0;
  }

  & > .notice-info {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #999;

    & > .time {
      margin-right: 8px;
    }

    & > .read-btn {
      display: inline-flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        color: #1e80ff;
      }
    }
  }
}
</style>
