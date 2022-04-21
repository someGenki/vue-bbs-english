<template>
  <div class="comment-card" :class="{ children: parent !== null }">
    <!--后台返回的子评论数据中无头像！以后在改吧-->
    <app-avatar
      :uid="data.fromId"
      :avatar="data.fromAvatar || data.fromName"
      :nickname="data.fromName"
    />
    <!--评论者信息、内容、日期点赞数据、默认隐藏的评论框、递归的自身组件-->
    <div class="comment-wrapper">
      <from-user :nickname="data.fromName" :uid="data.fromId" />
      <!--内容展示-->
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
      </template>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import dayjs from 'dayjs'
import FromUser from './FromUser.vue'
import ReplyUserAt from './ReplyUserAt.vue'
import CommentInfo from './CommentInfo.vue'
import CommentCard from '/src/components/CommentCard/index.vue'
import ContentPublish from '/src/components/ContentPublish/index.vue'
import { processWx } from '/src/hooks/emotion/useEmotions'
import { ElMessage } from 'element-plus'
import { postComment } from '/src/api/comment'
import { useUserStore } from '/src/store/user'
import { useComment } from '/src/hooks/content/useComment'

// 评论功能也是个难点 包括唯一的输入框，递归展示 <comment-card :data="data" />
const { data, parent } = defineProps({
  // id fromUser ...
  data: { type: Object, required: true },
  parent: { type: Object, default: null },
})
const user = useUserStore()
const { switchShow, showReply, inputText } = useComment()
const placeText = `回复${data.fromName}...`
const dayjsFormat = 'YYYY-MM-DD HH:mm:ss'
const itemType = inject('itemType')

// 发送请求并回显评论
const handleReply = () => {
  const raw = {
    parentId: parent ? parent.id : data.id,
    content: inputText.value,
    fromName: user.nickname,
    ...itemType,
  }
  if (parent) {
    raw.toId = data.fromId
    raw.toName = data.fromName
    // 将当前字评论的children指向 保证评论结构(2层)
    data.children = parent.children
  }
  postComment(raw).then((res) => {
    ElMessage({ type: 'success', message: res.msg })
    // 评论后后台技术返回的数据没有日期。先这样
    res.data.gmtCreate = dayjs().format(dayjsFormat)
    if (!Array.isArray(data.children)) data.children = []
    data.children.push({ ...res.data })
    inputText.value = ''
    switchShow()
  })
}
</script>

<style lang="scss" scoped>
.comment-card {
  min-height: 40px;
  padding: 12px 2px;
  border-bottom: 1px solid #f0f0f0;

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
    color: #171819;
    text-shadow: none;
    word-break: break-word;
    word-wrap: break-word;
    white-space: pre-wrap;
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
