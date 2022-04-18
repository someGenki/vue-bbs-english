<template>
  <div
    v-if="loaded"
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="disabled"
    class="read-container"
  >
    <read-card v-for="item in models.records" :data="item" />
  </div>
</template>

<script setup>
import ReadCard from './ReadCard.vue'
import { useGetPage } from '/src/hooks/content/useGetPage'
import { getArticleList } from '/src/api/article'

const { loaded, models, disabled, loadMore, getPaging } = useGetPage(
  1,
  5,
  getArticleList,
  null
)
getPaging(1, 5)
</script>

<style lang="scss" scoped>
.read-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
