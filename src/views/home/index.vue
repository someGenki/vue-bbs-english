<template>
  <div class="home-container">
    <div class="posts-container">
      <!--分类筛选帖子的标签栏-->
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
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getPost } from '/src/api/post'
import { useGetPage } from '/src/hooks/content/useGetPage'
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
// 将箭头函数作为category的一个依赖，category变化时重新执行该箭头函数
watchEffect(() => getPaging(1, 10, category.value))
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
</style>
