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
        <div class="publish-area">
          <div class="publish-title">评论</div>
          <app-avatar
            v-if="user.hadLogin"
            :uid="user.uid"
            :avatar="user.avatar"
            :nickname="user.nickname"
          />
          <span v-else>X</span>
          <textarea placeholder="发一条友善的评论" />
        </div>
      </el-skeleton>
    </div>
    <div class="aside-area">
      <div class="aside-box" v-for="i in 4"></div>
    </div>
  </div>
</template>

<script setup>
import '/src/styles/markdown-theme.scss'
import { ref } from 'vue'
import { marked } from 'marked'
import { useRoute } from 'vue-router'
import { getPostDetail } from '/src/api/post'
import { getUserInfoDigest } from '/src/api/user'
import MetaInfo from './MetaInfo.vue'
import { useUserStore } from '../../store/user'

const pid = useRoute().params.pid
const post = ref(null)
const loaded = ref(false)
const user = useUserStore()

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
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  margin-bottom: 12px;

  > .article-title {
    margin: 0 0 20px;
    font-size: 32px;
    font-weight: 600;
    line-height: 1.31;
    color: #252933;
  }
}

.publish-area {
  height: 140px;
  padding: 16px 28px;
  background-color: white;
  border: 1px solid #e0e0e0;

  > .publish-title {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 12px;
    width: 40px;
  }

  > textarea {
    font-size: 14px;
    margin-left:22px;
    width:calc(98% - 60px);
    padding: 1%;
    height: 48px;
    resize: none;
    //overflow-y: hidden;
    outline: none;
    border: none;
    border-radius: 4px;

    &:focus {
      outline: 1px solid #1e80ff;
    }
  }
}

.aside-area {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 600px;

  > .aside-box {
    border: 1px solid #e0e0e0;
    min-height: 150px;
    border-radius: 4px;
    margin-bottom: 12px;
    background: #fff;
  }
}
</style>
