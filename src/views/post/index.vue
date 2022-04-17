<template>
  <div class="post-view">
    <div class="main-area">
      <el-skeleton :loading="!loaded" :throttle="400">
        <article v-if="loaded" class="article-area">
          <h1 class="article-title">{{ post.title }}</h1>
          <meta-info :article="post" :get-info="getUserInfoDigest" />
          <div class="markdown-body" v-html="marked(post.content)" />
          <!--<div> TODO 相关附件:参考掘金的被收录于专栏： </div>-->
        </article>
        <content-publish :place-text="placeText" v-model="inputText" />
      </el-skeleton>
    </div>
    <div class="aside-area">
      <div class="aside-box" v-for="i in 4"></div>
    </div>
  </div>
</template>

<script setup>
import '/src/styles/markdown-theme.scss'
import { ref, computed } from 'vue'
import { marked } from 'marked'
import { useRoute } from 'vue-router'
import { getPostDetail } from '/src/api/post'
import { getUserInfoDigest } from '/src/api/user'
import { useUserStore } from '/src/store/user'
import MetaInfo from './MetaInfo.vue'
import AppEmotion from '/src/components/AppEmotion/index.vue'
import ContentPublish from './ContentPublish.vue'

const pid = useRoute().params.pid
const post = ref(null)
const loaded = ref(false)
const inputText = ref(null)
const user = useUserStore()

const placeText = computed(() =>
  user.hadLogin ? '发一条友善的评论' : `请先登录再发表(●'◡'●)`
)
const canReply = computed(() => {
  return user.hadLogin && inputText.value
})

function handleSubmit() {
  if (!canReply.value) return
  console.log(inputText.value)
}

getPostDetail(pid).then((res) => {
  loaded.value = true
  post.value = res.data
})
</script>

<style lang="scss" scoped>
.post-view {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 500px;
  margin: 0 auto;
}

.main-area {
  position: relative;
  width: 870px;
  max-width: 100%;
  height: 800px;
}

.article-area {
  height: 500px;
  padding: 32px;
  margin-bottom: 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;

  > .article-title {
    margin: 0 0 20px;
    font-size: 32px;
    font-weight: 600;
    line-height: 1.31;
    color: #252933;
  }
}

.aside-area {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 600px;

  > .aside-box {
    min-height: 150px;
    margin-bottom: 12px;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }
}
</style>
