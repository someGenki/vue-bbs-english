<template>
  <div :data-id="data.id" class="post-card">
    <router-link target="_blank" :to="`/post/${data.id}`" class="post-card-box">
      <app-avatar v-bind="data" />
      <img
        v-if="content.firstImg"
        :src="content.firstImg"
        v-default-img
        class="card-image"
      />
      <div class="card-content">
        <div class="card-info">
          <span :style="{ color: nameColor }" class="nickname">
            {{ data.nickname }}
          </span>
        </div>
        <div class="card-title">{{ data.title }}</div>
        <div class="post-content">{{ content.rawText }}</div>
      </div>
    </router-link>
    <post-card-info :data="data" />
    <app-icon
      class="post-card-more"
      icon="el-icon-arrow-down"
      size="12"
      color="#717171"
    />
  </div>
</template>

<script setup>
import { getMarkdownData, getStrColor } from '/src/utils/process'
import PostCardInfo from './PostCardInfo.vue'

// [id,uid,avatar,nickname,content,gmtCreate,likes,pv,comments[,tags]]
const props = defineProps({ data: { type: Object } })

const nameColor = getStrColor(props.data.nickname)
const content = getMarkdownData(props.data.content)
</script>

<style lang="scss" scoped>
@import '/src/styles/_variables';

.post-card {
  position: relative;
  height: 150px;
  padding: 12px 16px;
  margin-bottom: 12px;
  background-color: #ffffff;
  border-radius: 3px;
  transition: all 0.15s;

  &:hover {
    box-shadow: $card-shadow;
  }

  .post-card-more {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    visibility: hidden;
  }

  &:hover > .post-card-more {
    visibility: visible;
  }
}

.post-card-box {
  height: 110px;
  cursor: pointer;

  // 右侧首图
  .card-image {
    float: right;
    height: 90px;
    margin-top: 10px;
    margin-left: 6px;
  }

  // 卡片内容：个人信息+标题+预览正文
  .card-content {
    position: relative;
    margin-left: 46px;
    font-size: 14px;

    // 个人信息
    .card-info {
      position: relative;

      .nickname {
        margin-right: 4px;
      }
    }

    // 标题部分
    .card-title {
      padding-right: 4px;
      margin: 8px 0;
      overflow: hidden;
      font-size: 18px;
      font-weight: bolder;
      color: $title-text-color;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    // 正文部分
    .post-content {
      display: -webkit-box;
      overflow: hidden;
      color: $deep-gray;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
