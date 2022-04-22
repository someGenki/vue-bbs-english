<template>
  <!--评论区 根据postId获取-->
  <el-skeleton :loading="!loaded">
    <div
      v-if="loaded"
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="disabled"
      class="comment-area"
    >
      <div class="comment-title">全部评论</div>
      <comment-card v-for="item in models.records" :data="item" />
      <el-empty v-if="models.records.length === 0" />
    </div>
  </el-skeleton>
</template>

<script setup>
import { useGetPage } from '../../hooks/content/useGetPage'
import { getPostComments } from '../../api/post'
import CommentCard from '/src/components/CommentCard/index.vue'

const { pid } = defineProps({
  pid: { type: [Number, String], required: true },
})
const commentSize = 4
const { loaded, models, disabled, loadMore, getPaging } = useGetPage(
  1,
  commentSize,
  getPostComments,
  { delay: 380 },
  pid
)
// 获取文章下的评论列表
getPaging(1, commentSize, pid)

// 重新加载更多
const reLoadMore = () => {
  getPaging(1, commentSize, pid).then(loadMore)
}
defineExpose({ reLoadMore })
</script>

<style lang="scss" scoped>
// 评论区
.comment-area {
  padding: 12px 28px;
  margin-bottom: 24px;
  background: #ffffff;
  border: 1px solid #e0e0e0;

  > .comment-title {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
