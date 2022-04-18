<template>
  <div class="home-container">
    <div class="posts-container">
      <home-tab :category="category" />
      <post-card-list :category="category" />
    </div>
    <home-aside />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import HomeAside from './HomeAside.vue'
import HomeTab from './HomeTab.vue'
import PostCardList from '/src/components/PostCardList/index.vue'

const route = useRoute()
const category = computed(() => route.params.category || 'default')
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
