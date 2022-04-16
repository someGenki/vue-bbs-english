<template>
  <div :data-id="data.id" class="post-card">
    <div class="post-card-box">
      <a :data-uid="data.uid" @click="$router.push('/profile/' + data.id)">
        <!--TODO 头像为默认首名字-->
        <img
          :src="data.avatar"
          class="card-avatar"
          v-default-img="data.nickname"
          alt=""
        />
      </a>
      <img v-if="content.firstImg" :src="content.firstImg" class="card-image" />
      <div class="card-content">
        <div class="card-info">
          <span :style="{ color: nameColor }" class="nickname">{{
            data.nickname
          }}</span>
        </div>
        <div class="card-title">{{ data.title }}</div>
        <div class="post-content">{{ content.rawText }}</div>
      </div>
    </div>
    <div class="post-card-footer">
      <div class="item thumbs-up"><i />{{ data.likes }}</div>
      <div class="item view"><i />{{ data.pv }}</div>
      <div class="item messenger"><i />{{ data.comments }}</div>
      <span class="divide">|</span>
      <span class="item">{{ timeStr }}</span>
      <el-tag
        v-if="data.tags"
        class="post-tag"
        :color="tagColor"
        effect="dark"
        type="info"
      >
        {{ data.tags }}
      </el-tag>
    </div>
    <app-icon
      class="post-card-more"
      size="14"
      color="#717171"
      icon="el-icon-arrow-down"
    />
  </div>
</template>

<script setup>
import { getStrColor, getMarkdownData } from '/src/utils/process'
import dayjs from 'dayjs'

const props = defineProps({ data: { type: Object } })

const timeStr = dayjs().to(dayjs(props.data.gmtCreate))
const nameColor = getStrColor(props.data.nickname)
const tagColor = getStrColor(props.data.tags)
const content = getMarkdownData(props.data.content)
</script>

<style lang="scss" scoped>
.post-card {
  position: relative;
  padding: 12px 16px;
  margin-bottom: 10px;

  cursor: pointer;
  background-color: #ffffff;
  border-radius: 3px;
  transition: all 0.15s;

  &:hover {
    box-shadow: 12px 12px 20px rgba(0, 0, 0, 0.05);
  }

  .post-card-more {
    position: absolute;
    top: 6px;
    right: 6px;
    visibility: hidden;
  }

  &:hover > .post-card-more {
    visibility: visible;
  }
}

.post-card-box {
  height: 100px;

  // 左侧头像
  .card-avatar {
    display: block;
    float: left;
    width: 36px;
    height: 36px;

    overflow: hidden;
    vertical-align: middle;
    background: #dadada;
    border-radius: 50%;
  }

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
      margin: 4px 0;
      overflow: hidden;
      font-size: 18px;
      font-weight: bolder;
      color: #1d2129;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    // 正文部分
    .post-content {
      display: -webkit-box;
      overflow: hidden;
      color: #4a545f;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.post-card-footer {
  display: flex;
  align-items: center;
  margin-left: 45px;

  color: #4e5969;
  user-select: none;

  // 分割线 ` | `
  .divide {
    margin-right: 14px;
    font-size: 12px;
    color: #999;
  }

  // 图标和内容
  .item {
    display: flex;
    align-items: center;
    margin-right: 14px;
    font-size: 13px;
    line-height: 20px;

    i {
      display: block;
      width: 16px;
      height: 16px;
      margin-right: 6px;
      background-size: 100%;
    }

    &.thumbs-up > i {
      background-image: url('/src/assets/images/thumbs-up.png');
    }

    &.view > i {
      background-image: url('/src/assets/images/view.png');
    }

    &.messenger > i {
      background-image: url('/src/assets/images/messenger.png');
    }
  }

  // 卡片标签
  .post-tag {
    height: 22px;
    margin-left: auto;
    border: none;
  }
}
</style>
