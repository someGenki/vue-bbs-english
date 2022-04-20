<template>
  <div
    v-if="loaded"
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="disabled"
    class="message-board-list"
  >
    <h3>总计{{ models.total }}条留言</h3>
    <MessageListItem
      v-for="item in models.records"
      :model="item"
      :key="item.id"
      :parent="true"
    />
    <p v-show="disabled" class="noMore">没有更多了👋</p>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import { getMessage } from '/src/api/message'
import { useGetPage } from '/src/hooks/content/useGetPage'
import MessageListItem from './MessageListItem.vue'

const { loaded, models, disabled, loadMore, getPaging } = useGetPage(
  1,
  10,
  getMessage,
  null
)

getPaging(1, 5)
provide('uniReply', ref(null)) // 兄弟组件间通信
</script>

<style lang="scss" scoped>
.message-board-list {
  margin:24px 0;
  padding: 4px 24px;
  border-radius: 4px;
  background-color: #FFFFFF;
  border: 1px solid #e0e0e0;
}
</style>
