<template>
  <div class="post-view">
    <div class="main-area">
      <el-skeleton :loading="!loaded" :throttle="400">
        <!--主体内容展示[Markdown]-->
        <article v-if="loaded" class="article-area">
          <h1 class="article-title">{{ post.title }}</h1>
          <meta-info :article="post" />
          <div class="markdown-body" v-html="marked(post.content)" />
          <!--TODO <div>相关附件:参考掘金的被收录于专栏： </div> -->
        </article>
        <content-publish
          title="评论"
          :place-text="placeText"
          v-model="inputText"
        />
      </el-skeleton>
      <div class="comment-area">
        <div class="comment-title">全部评论</div>
        <comment-card :data="data" />
      </div>
    </div>
    <div class="aside-area">
      <div class="aside-box" v-for="i in 2">
        <el-empty description="description" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import { marked } from 'marked'
import '/src/styles/markdown-theme.scss'
import { useRoute } from 'vue-router'
import { getPostDetail } from '/src/api/post'
import { useUserStore } from '/src/store/user'
import MetaInfo from '/src/components/MetaInfo/index.vue'
import ContentPublish from '/src/components/ContentPublish/index.vue'
import CommentCard from '/src/components/CommentCard/index.vue'

const pid = useRoute().params.pid
const post = ref(null)
const loaded = ref(false)
const inputText = ref(null)
const user = useUserStore()

const placeText = computed(() =>
  user.hadLogin ? '发一条友善的评论' : `请先登录再发表(●'◡'●)`
)

provide('only-reply', ref(null))

const data = {
  id: 2,
  parentId: 0,
  itemId: 1,
  itemType: 4,
  fromId: 1,
  fromName: 'jojo',
  toId: null,
  toName: null,
  likes: 0,
  content: 'haha',
  status: 1,
  gmtCreate: '2020-09-23 22:07:15',
  children: [
    {
      id: 2,
      parentId: 0,
      itemId: 1,
      itemType: 4,
      fromId: 1,
      fromName: 'jojo',
      toId: null,
      toName: null,
      likes: 0,
      content: 'haha',
      status: 1,
      gmtCreate: '2020-09-23 22:07:15',
      children: [],
      childrenCount: 0,
      fromAvatar: 'http://res7.fanyibar.top/1612353510311-shy.jpg',
    },
    {
      id: 2,
      parentId: 1,
      itemId: 1,
      itemType: 4,
      fromId: 1,
      fromName: 'jojo',
      toId: null,
      toName: null,
      likes: 0,
      content: 'haha',
      status: 1,
      gmtCreate: '2020-09-23 22:07:15',
      children: [],
      childrenCount: 0,
      fromAvatar: 'http://res7.fanyibar.top/1612353510311-shy.jpg',
    },
  ],
  childrenCount: 0,
  fromAvatar: 'http://res7.fanyibar.top/1612353510311-shy.jpg',
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
  margin: 0 auto;
}

.main-area {
  position: relative;
  width: 870px;
  max-width: 100%;
}

// 评论区
.comment-area {
  padding: 12px 28px;
  background: #ffffff;
  border: 1px solid #e0e0e0;

  > .comment-title {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
  }
}

// 正文展示
.article-area {
  padding: 24px 30px;
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

// 侧边栏
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
