<template>
  <div
    v-if="loaded"
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="disabled"
  >
    <post-card v-for="item in models.records" :key="item.id" :data="item" />
    <p v-show="disabled" class="noMore">没有更多了</p>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { getPostList } from '/src/hooks/post/usePost'
import PostCard from './PostCard.vue'

const props = defineProps({
  category: { type: String, default: 'default' },
})

const loaded = ref(false)
const models = reactive({})
const disabled = computed(() => models.current >= models.pages)

const loadMore = () => {
  if (isNaN(models.current)) return
  getPostList(models.current + 1, 5, models, loaded, props.category)
}

getPostList(1, 10, models, loaded, props.category)
</script>

<style lang="scss" scoped>
.noMore {
  margin-top: 10px;
  font-size: 14px;
  color: #5c5c5c;
  text-align: center;
}
</style>
