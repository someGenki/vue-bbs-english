<template>
  <div class="notice-card">
    <!--    <app-icon
          color="#5BA1FF"
          size="36"
          class="notice-type"
          icon="el-icon-list"
        />-->
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
import { processWx } from '/src/hooks/emotion/useEmotions'

const props = defineProps({
  notice: { type: Object, required: true },
})
const emit = defineEmits(['read'])
</script>

<style lang="scss" scoped>
@import '/src/styles/variables';
.notice-card {
  position: relative;
  padding: 12px 0 6px 14px;
  margin: 4px 16px;
  border-bottom: $divide-thin-border;

  & > .notice-type {
    position: absolute;
    left: -10px;
  }

  & > .notice-title {
    font-size: 14px;
    color: $deep-gray;
    cursor: pointer;
    &:hover {
      color: $deep-blue;
    }
  }

  & > .notice-content {
    margin: 6px 0;
  }

  & > .notice-info {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: $mild-gray;

    & > .time {
      margin-right: 8px;
    }

    & > .read-btn {
      display: inline-flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        color: $deep-blue;
      }
    }
  }
}
</style>
