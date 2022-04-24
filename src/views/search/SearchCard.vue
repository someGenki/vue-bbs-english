<template>
  <div class="search-card">
    <div class="search-title">
      <router-link :to="`/${isPost(data) ? 'post' : 'article'}/${data.id}`">
        <span v-html="mark(data.title)" />
      </router-link>
    </div>
    <div class="search-content" v-html="mark(data.title)" />
    <div class="search-infos">
      <span class="svg-item view"><i />{{ data.pv }}</span>
      <span class="time">{{ data.gmtCreate }}</span>
      <tags-row :tags="data.tags" />
    </div>
  </div>
</template>

<script setup>
import TagsRow from '/src/components/TagsRow/index.vue'

const props = defineProps({
  data: { type: Object },
  mark: { type: Function },
})
const isPost = (data) => data.hasOwnProperty('hot')
</script>

<style lang="scss" scoped>
.search-card {
  padding: 16px;
  border-top: 1px solid #f5f5f5;

  .search-title {
    font-size: 18px;
    font-weight: bolder;
    // 悬浮下划线
  }

  .search-content {
    height: 20px;
    margin: 8px 0;
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    color: #5c5c5c;
  }

  .search-infos {
    display: flex;
    align-items: center;

    .article-tags {
      display: inline-block;
      margin: 0 12px;
    }
  }

  :deep(em) {
    font-style: normal;
    color: #f03232;
  }
}
</style>
