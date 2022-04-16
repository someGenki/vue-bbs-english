<template>
  <div class="home-container">
    <div class="posts-container">
      <post-list />
    </div>
    <home-aside />
  </div>
</template>

<script setup>
import HomeAside from './HomeAside.vue'
import PostList from './PostList.vue'

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
