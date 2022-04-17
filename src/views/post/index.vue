<template>
  <div class="post-view">
    <div class="main-area">
      <el-skeleton :loading="!loaded" :throttle="400">
        <article v-if="loaded" class="article-area">
          <h1 class="article-title">{{ post.title }}</h1>
          <div v-if="loadedByInfo" class="article-author">
            <app-avatar size="40" v-bind="info" />
            <div class="info-box">
              <div class="nickname">{{ info.nickname }}</div>
              <div class="meta-box">
                <span class="time">{{ post.gmtCreate }}</span>
                <span class="views">阅览次数&nbsp;{{ post.pv }}</span>
              </div>
            </div>
          </div>
          <div
            class="article-content markdown-body"
            v-html="marked(post.content)"
          />
        </article>
      </el-skeleton>
    </div>
    <div class="aside-area"></div>
  </div>
</template>

<script setup>
import '/src/styles/markdown-theme.scss'
import { ref } from 'vue'
import { marked } from 'marked'
import { useRoute } from 'vue-router'
import { getPostDetail } from '/src/api/post'
import { getUserInfoDigest } from '/src/api/user'

const pid = useRoute().params.pid
const loaded = ref(false)
const loadedByInfo = ref(false)
const post = ref(null)
const info = ref(null)

getPostDetail(pid).then((res) => {
  loaded.value = true
  post.value = res.data
  getUserInfoDigest(res.data.uid).then((res) => {
    loadedByInfo.value = true
    info.value = res.data
  })
})
</script>

<style lang="scss" scoped>
.post-view {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 500px;
  margin: 0 auto;
  border: 1px solid pink;
}

.main-area {
  position: relative;
  width: 870px;
  max-width: 100%;
  height: 800px;
  border: 1px solid red;
}

.article-area {
  height: 500px;
  padding: 32px;
  background: #fff;
  border-radius: 4px;

  > .article-title {
    margin: 0 0 20px;
    font-size: 32px;
    font-weight: 600;
    line-height: 1.31;
    color: #252933;
  }

  > .article-author {
    height: 45px;
  }

  > .article-author > .info-box {
    padding-left: 12px;
    overflow: hidden;

    .meta-box {
      margin-top: 2px;
      font-size: 14px;
      line-height: 22px;
      color: #8a919f;
    }

    .meta-box > .time::after {
      margin: 0 8px;
      color: #868b91;
      content: '·';
    }
  }
}

.aside-area {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 600px;
  border: 1px solid aqua;
}
</style>
