<template>
  <div class="comment-card" :class="{ children: parent !== null }">
    <app-avatar
      :uid="data.fromId"
      :avatar="data.fromAvatar"
      :nickname="data.fromName"
    />
    <!--评论者信息、内容、日期点赞数据、默认隐藏的评论框、递归的自身组件-->
    <div class="comment-wrapper">
      <from-user :nickname="data.fromName" :uid="data.fromId" />
      <!--具体内容展示-->
      <div class="comment-content">
        <reply-user-at
          v-if="parent !== null && data.toId"
          :uid="data.toId"
          :nickname="data.toName"
        />
        <span v-html="processWx(data.content)" />
      </div>
      <!--底部信息栏 点赞、回复按钮-->
      <comment-info
        :switch-show="switchShow"
        :show-reply="showReply"
        :data="data"
      />
      <!--评论输入框-->
      <content-publish
        v-if="showReply"
        v-model="inputText"
        :compact="true"
        :auto-focus="true"
        :place-text="placeText"
        @reply="handleReply"
      />
      <!--只有父评论才显示子评论，避免嵌套过深-->
      <template v-if="!parent && data?.children?.length > 0">
        <CommentCard
          v-for="child in data.children"
          :key="child.id"
          :parent="data"
          :data="child"
        />
        <span v-if="data.childrenCount > data.children.length" class="loadMore">
          共{{ data.childrenCount }}条回复，
          <span @click="loadChildReply" class="loadMore-btn">点击加载</span>
        </span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useUserStore } from '/src/store/user'
import { processWx } from '/src/hooks/emotion/useEmotions'
import { useComment } from '/src/hooks/content/useComment'
import { getChildCommentList, postComment } from '/src/api/comment'
import FromUser from './FromUser.vue'
import ReplyUserAt from './ReplyUserAt.vue'
import CommentInfo from './CommentInfo.vue'
import CommentCard from '/src/components/CommentCard/index.vue'
import ContentPublish from '/src/components/ContentPublish/index.vue'

// 评论功能也是个难点和复杂点 包括唯一的输入框，递归展示 <comment-card :data="data" />
const { data, parent } = defineProps({
  // id,fromUser[,toUser],content,children,likes,gmtCreate
  data: { type: Object, required: true },
  // 由父级评论传递其自身data，用于处理父子评论关系
  parent: { type: Object, default: null },
})
const { switchShow, showReply, inputText, itemType } = useComment()
const user = useUserStore()
const placeText = `回复${data.fromName}...`

// 发送请求并回显评论
const handleReply = () => {
  const raw = {
    parentId: parent ? parent.id : data.id,
    content: inputText.value,
    fromId: user.uid,
    fromName: user.nickname,
    toId: data.fromId,
    ...itemType,
  }
  if (parent) {
    // 将当前字评论的children指向 保证评论结构(2层)
    data.children = parent.children
    raw.toName = data.fromName
  }
  postComment(raw).then((res) => {
    ElMessage({ type: 'success', message: res.msg })
    res.data.fromAvatar = user.avatar
    if (!Array.isArray(data.children)) data.children = []
    data.children.push({ ...res.data })
    inputText.value = ''
    switchShow()
  })
}
// 只有父评论有加载子评论的方法
const loadChildReply = () => {
  if (parent) return
  getChildCommentList(1, 10, data.id).then((res) => {
    data.children.length = 0
    data.children.push(...res.data.records)
  })
}
</script>

<style lang="scss" scoped>
@import '/src/styles/_variables';

.comment-card {
  min-height: 40px;
  padding: 12px 2px;
  border-bottom: $divide-thin-border;

  &:last-of-type {
    border-bottom: 0;
  }
}

.comment-wrapper {
  margin-left: 50px;
  line-height: 1.5;

  > .comment-content {
    margin-bottom: 4px;
    overflow: hidden;
    color: $content-text-color;
    text-shadow: none;
    word-break: break-word;
    word-wrap: break-word;
    white-space: pre-wrap;

    :deep(.wx-emoji) {
      margin-bottom: -4px;
    }
  }
}

.loadMore-btn {
  cursor: pointer;

  &:hover {
    color: $deep-blue;
  }
}

// 当组件作为子组件调用时 使其变得更紧凑
.comment-card.children {
  padding: 8px 2px;
  border-bottom: 0;

  .from-user,
  .comment-content {
    display: inline;
  }
}
</style>
