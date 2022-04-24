<template>
  <div class="search-view">
    <div v-if="list" class="search-area">
      <search-card v-for="item in list" :mark="markWord" :data="item" />
      <el-empty v-if="list.length === 0" />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getSearch } from '/src/api/search'
import SearchCard from '/src/components/SearchCard/index.vue'

const route = useRoute()
const list = ref(null)
const emReg = ref(null)

watchEffect(() => {
  getSearch(route.query.q).then((res) => (list.value = res.data))
  emReg.value = new RegExp(route.query.q || '', 'gim')
})
const markWord = (text) => {
  if (!route.query.q) return text
  return text.replace(emReg.value, (t) => `<em>${t}</em>`)
}
</script>

<style lang="scss" scoped>
.search-view {
  max-width: 1000px;
  margin: 0 auto;
}

// 非中心摆放，更加贴切习惯(还是看掘金的)
.search-area {
  max-width: 768px;
  min-height: 300px;
  background: #ffffff;
}
</style>
