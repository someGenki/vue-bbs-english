<template>
  <div class="home-container">
    <div class="posts-container">
      <home-tab :category="category" />
      <!-- 帖子预览卡片带骨架屏 -->
      <el-skeleton :count="5" animated :loading="!loaded">
        <div
          v-if="loaded"
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="disabled"
        >
          <post-card
            v-for="item in models.records"
            :key="item.id"
            :data="item"
          />
          <p v-show="disabled" class="noMore">没有更多了</p>
        </div>
      </el-skeleton>
    </div>
    <home-aside />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useGetPage } from '/src/hooks/content/useGetPage'
import { getPost } from '/src/api/post'
import { watchEffect } from 'vue'
import HomeAside from './HomeAside.vue'
import HomeTab from './HomeTab.vue'
import PostCard from '/src/components/PostCard/index.vue'

const route = useRoute()
const category = computed(() => route.params.category || 'default')

const { loaded, models, disabled, loadMore, getPaging } = useGetPage(
  1,
  10,
  getPost,
  { delay: 320 },
  category.value
)

watchEffect(() => {
  getPaging(1, 10, category.value)
})
</script>

<style lang="scss" scoped>
.home-container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: auto;
}

.posts-container {
  width: 700px;
  height: 50vh;

  margin-right: 21rem;
  border-radius: 4px;
}

.el-skeleton {
  --el-skeleton-color: #f4f1f1 !important;
}
</style>
