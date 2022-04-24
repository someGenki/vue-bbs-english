<template>
  <div class="user-notice">
    <div class="notice-head">
      <p style="margin: 0">通知中心</p>
      <el-button @click="handleRead(0)" round color="#1578FF">
        全部已读
      </el-button>
    </div>
    <div v-if="loading" class="notice-list">
      <notice-card
        @read="handleRead(n.id)"
        v-for="n in commentNoticeList"
        :notice="n"
      />
      <el-empty v-if="commentNoticeList.length === 0" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { getNotice, readNotice } from '/src/api/user'
import NoticeCard from '/src/components/NoticeCard/index.vue'

// 根据资源的类型和id生成一个链接，不带域名
function makeLink(itemType, itemId) {
  switch (itemType) {
    // case 1:
    case 4:
      return '/post/' + itemId
    case 3:
      return '/article/' + itemId
    default:
      return '/404'
  }
}

const loading = ref(false)
const commentNoticeList = reactive([])
const likeNoticeList = reactive([])
// 临时写法
const handleRead = (id) => {
  readNotice(id).then(() => {
    if (id !== 0) {
      let index = commentNoticeList.findIndex((e) => e.id === id)
      commentNoticeList.splice(index, 1)
    } else {
      commentNoticeList.length = 0
      ElNotification('全部已读成功')
    }
  })
}
getNotice().then((res) => {
  res.data.forEach((notice) => {
    notice.link = makeLink(notice.itemType, notice.itemId)
    if (notice.type === 4) {
      commentNoticeList.push(notice)
    } else if (notice.type === 2) {
      likeNoticeList.push(notice)
    } else console.log('unknown')
  })
  loading.value = true
})
</script>

<style lang="scss" scoped>
.user-notice {
  max-width: 1000px;
  min-height: 400px;
  margin: 0 auto;
}

.notice-list {
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}

.notice-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 18px;

  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}
</style>
