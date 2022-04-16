<template>
  <div
    v-if="true"
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
    <p v-if="true" class="noMore">没有更多了👋</p>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { getMessage } from '/src/api/message'
import MessageListItem from './MessageListItem.vue'

const loaded = ref(false)
const models = reactive({})
const disabled = computed(() => models.current >= models.pages)

const loadMore = () => {
  loadMessage((models.current || 1) + 1, 5, models)
}

loadMessage(1, 5, models, loaded)

function loadMessage(num, size, models, loaded) {
  getMessage(num, size, models).then((res) => {
    // 总数据条数
    models.total = res.data.total
    // 总页码数量
    models.pages = res.data.pages
    // 当前页码
    models.current = res.data.current
    // 具体留言数据
    if (num === 1) {
      models.records = []
      loaded.value = true
    }
    for (const item of res.data.records) {
      models.records.push(item)
    }
  })
}
</script>

<style lang="scss" scoped>
.noMore {
  margin-top: 10px;
  font-size: 14px;
  color: #5c5c5c;
  text-align: center;
}
</style>
