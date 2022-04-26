<template>
  <div class="search-card">
    <div class="search-title">
      <router-link :to="`/${isPost(data) ? 'post' : 'article'}/${data.id}`">
        <span v-html="title" />
      </router-link>
    </div>
    <div class="search-content" v-html="content" />
    <div class="search-infos">
      <span class="svg-item view"><i />{{ data.pv }}</span>
      <span class="time">{{ data.gmtCreate }}</span>
      <tags-row :tags="data.tags" />
      <slot name="ops"></slot>
    </div>
  </div>
</template>

<script setup>
import TagsRow from '/src/components/TagsRow/index.vue'

const { data, mark } = defineProps({
  data: { type: Object },
  mark: { type: Function },
})
const isPost = (data) => data.hasOwnProperty('hot')
const title = mark ? mark(data.title) : data.title
const content = mark ? mark(data.content) : data.content
</script>

<style lang="scss" scoped>
@import '/src/styles/variables';

.search-card {
  padding: 16px;
  border-top: $divide-thin-border;

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
    color: $deep-gray;
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
  &:hover {
    background-color: #f5f5f5;
  }
}
</style>
