<template>
  <div class="home-container">
    <div class="posts-container">
      <div class="tabs-wrap">
        <span
          v-for="cs in postCategory"
          :class="{ selected: category === cs.value }"
          @click="$router.replace({ params: { category: cs.value } })"
          >{{ cs.name }}
        </span>
      </div>
      <post-list :category="category" />
    </div>
    <home-aside />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import HomeAside from './HomeAside.vue'
import PostList from './PostList.vue'
import { postCategory } from '/src/hooks/post/usePost'

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

  & > .tabs-wrap {
    color: #999;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
    margin-left: 10px;
  }

  & > .tabs-wrap > span {
    cursor: pointer;
    margin-right: 24px;
    position: relative;

    &.selected {
      color: #569cf8;
    }

    &.selected::after {
      content: '';
      position: absolute;
      background-color: #569cf8;
      left: calc(50%);
      bottom: -8px;
      width: 24px;
      height: 4px;
      border-radius: 8px;
      transform: translateX(-50%);
    }
  }
}
</style>
