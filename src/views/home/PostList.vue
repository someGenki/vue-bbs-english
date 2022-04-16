<template>
  <el-skeleton :count="4" animated :loading="!loaded">
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
import { computed, reactive, ref, watchEffect } from 'vue'
import { getPostList } from '/src/hooks/post/usePost'
import PostCard from './PostCard.vue'

const props = defineProps({ category: { type: String, default: 'default' } })
const loaded = ref(false)
const models = reactive({})
const disabled = computed(() => models.current >= models.pages)

const loadMore = () => {
  if (isNaN(models.current)) return
  getPostList(models.current + 1, 10, models, loaded, props.category)
}

watchEffect(() => {
  getPostList(1, 10, models, loaded, props.category)
})
</script>

<style lang="scss" scoped>
.noMore {
  margin: 12px auto;
  font-size: 14px;
  color: #5c5c5c;
  text-align: center;
}

.el-skeleton {
  --el-skeleton-color: #f4f1f1 !important;
}
</style>
