<template>
  <div class="comment-card">
    <app-avatar
      :uid="data.fromId"
      :avatar="data.fromAvatar"
      :nickname="data.fromName"
    />
    <div class="comment-wrapper">
      <div class="from-user">
        <router-link :to="`/space/${data.fromId}`">
          {{ data.fromName }}
        </router-link>
      </div>
      <div class="comment-content">{{ data.content }}</div>
      <div class="comment-info">
        <span style="margin-right: 12px" class="time">{{
          data.gmtCreate
        }}</span>
        <!--<span>😈&nbsp;1</span>-->
        <span @click="switchShow">回复💬</span>
        <span>共{{ data.childrenCount }}条回复</span>
      </div>
      <content-publish
        v-if="showReplay"
        v-model.lazy="inputText"
        style="padding: 2px 4px; border: 0"
        :place-text="placeText"
        @reply="handleReply"
      />
      <!--只有父评论才显示子评论，避免嵌套过深-->
      <template v-if="parent && data?.children?.length > 0">
        <CommentCard
          v-for="child in data.children"
          :key="child.id"
          :data="child"
          :parent="false"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import CommentCard from '/src/components/CommentCard/index.vue' // 不导入自己递归调用时会找不到组件
import ContentPublish from '/src/components/ContentPublish/index.vue'

// 评论功能也是个难点 <comment-card :data="data" />
const props = defineProps({
  // id fromUser ...
  data: { type: Object, required: true },
  parent: { type: Boolean, default: true },
})
const inputText = ref('')
const showReplay = ref(false)
const placeText = `回复${props.data.fromName}...`
const onlyReply = inject('only-reply')
// console.log(onlyReply)
const switchShow = () => {
  showReplay.value = !showReplay.value
}

const handleReply = () => {
  console.log(inputText.value, props.data.fromId)
}
</script>

<style lang="scss" scoped>
.comment-card {
  min-height: 40px;
  padding: 12px 2px;
}

.comment-wrapper {
  margin-left: 50px;
  line-height: 1.5;

  > .from-user {
    margin-right: 8px;
    font-size: 15px;
    color: #62666d;
  }

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
  }
}
</style>
