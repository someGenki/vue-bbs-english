<template>
  <el-skeleton :count="5" animated :loading="!loaded">
    <div
      v-if="loaded"
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="disabled"
    >
      <post-card v-for="item in models.records" :key="item.id" :data="item" />
      <p v-show="disabled" class="noMore">没有更多了</p>
    </div>
  </el-skeleton>
</template>

<script setup>
import { watchEffect } from 'vue'
import { getPost } from '/src/api/post'
import { useGetPage } from '/src/hooks/content/useGetPage'
import PostCard from '/src/components/PostCardList/PostCard.vue'

const props = defineProps({
  category: { type: String, default: 'default' },
})

const { loaded, models, disabled, loadMore, getPaging } = useGetPage(
  1,
  10,
  getPost,
  { delay: 320 },
  props.category
)

watchEffect(() => {
  getPaging(1, 10, props.category)
})
</script>

<style lang="scss" scoped>
.el-skeleton {
  --el-skeleton-color: #f4f1f1 !important;
}
</style>
