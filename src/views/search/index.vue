<template>
  <div class="search-view">
    <div v-if="list" class="search-area">
      <div v-for="item in list" class="search-card">
        <div class="search-title">
          <router-link :to="`/${isPost(item) ? 'post' : 'article'}/${item.id}`"
            >{{ item.title }}
          </router-link>
        </div>
        <div class="search-content">{{ item.content }}</div>
        <div class="search-infos">
          <span class="svg-item view"><i />{{ item.pv }}</span>
          <span class="time">{{ item.gmtCreate }}</span>
          <tags-row :tags="item.tags" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getSearch } from '/src/api/search'
import TagsRow from '/src/components/TagsRow/index.vue'

const route = useRoute()
const list = ref(null)
const isPost = (data) => data.hasOwnProperty('hot')

getSearch(route.query.q).then((res) => (list.value = res.data))
</script>

<style lang="scss" scoped>
.search-view {
  max-width: 1000px;
  margin: 0 auto;
}

// 非中心摆放，更加贴切习惯(还是看掘金的)
.search-area {
  max-width: 768px;
  min-height: 500px;
  background: #fff;
}

.search-card {
  padding: 16px;
  border-top: 1px solid #f5f5f5;

  .search-title {
    font-size: 18px;
    font-weight: bolder;
    // 悬浮下划线
  }

  .search-content {
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    overflow: hidden;
    color: #5c5c5c;
    margin: 8px 0;
  }

  .search-infos {
    display: flex;
    align-items: center;

    .article-tags {
      display: inline-block;
      margin: 0 12px;
    }
  }
}
</style>