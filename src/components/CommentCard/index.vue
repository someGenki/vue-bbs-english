<template>
  <div class="comment-card" :class="{ children: !parent }">
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
          v-if="!parent && data.toId"
          :uid="data.toId"
          :nickname="data.toName"
        />
        {{ data.content }}
      </div>

      <!--底部栏: 发布时间、点赞、评论、评论条数-->
      <div class="comment-info">
        <span class="time">{{ data.gmtCreate }}</span>
        <span class="svg-item thumbs-up"><i />{{ data.likes }}</span>
        <span
          @click="switchShow"
          :class="{ showReply }"
          class="svg-item messenger"
        >
          <i />{{ showReply ? '收起回复' : '回复' }}
        </span>
        <span v-if="parent" class="total-reply">
          共&nbsp;{{ data.childrenCount }}&nbsp;条回复
        </span>
      </div>

      <!--评论输入框-->
      <content-publish
        v-if="showReply"
        v-model="inputText"
        style="padding: 2px 4px"
        :compact="!parent"
        :auto-focus="true"
        :place-text="placeText"
        @reply="handleReply"
      />

      <!--只有父评论才显示子评论，避免嵌套过深-->
      <template v-if="parent && data?.children?.length > 0">
        <CommentCard
          v-for="child in data.children"
          :key="child.id"
          :parent="false"
          :data="child"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, isRef } from 'vue'
import FromUser from './FromUser.vue'
import ReplyUserAt from './ReplyUserAt.vue'
import CommentCard from '/src/components/CommentCard/index.vue' // 不导入自己递归调用时会找不到组件
import ContentPublish from '/src/components/ContentPublish/index.vue'

// 评论功能也是个难点 包括唯一的输入框，递归展示 <comment-card :data="data" />
const props = defineProps({
  // id fromUser ...
  data: { type: Object, required: true },
  parent: { type: Boolean, default: true },
})
const inputText = ref('')
const showReply = ref(false)
const placeText = `回复${props.data.fromName}...`
const uniReply = inject('uniReply') // refImpl!

const switchShow = () => {
  const another = uniReply.value
  if (!showReply.value) {
    if (isRef(another)) {
      another.value = false // 关闭另一个展开的回复框
    }
    showReply.value = true // 打开当前回复框
    uniReply.value = showReply // 记得当前打开回复框的ref
  } else {
    uniReply.value = null
    showReply.value = false
  }
}

const handleReply = () => {
  // emit 事件
  console.log(inputText.value, props.data.fromId)
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

  > .comment-info {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #949494;

    & > span {
      margin-right: 12px;
    }

    & > .showReply {
      color: #1d7dfa;
    }

    & > .svg-item:hover {
      color: #1d7dfa;
      cursor: pointer;
    }

    & > .total-reply {
      margin-right: 16px;
      margin-left: auto;
    }
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
