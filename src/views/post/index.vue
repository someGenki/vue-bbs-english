<template>
  <div class="post-view">
    <div class="main-area">
      <!--骨架屏包裹 主体内容展示[Markdown] + 回帖输入框 -->
      <article v-if="post" class="article-area">
        <h1 class="article-title">{{ post.title }}</h1>
        <meta-info :article="post" />
        <div class="markdown-body" v-html="marked(post.content)" />
        <!--TODO <div>相关附件:参考掘金的被收录于专栏： </div> -->
      </article>
      <content-publish
        title="评论"
        @reply="handleReply"
        :place-text="placeText"
        v-model="inputText"
      />
      <!--评论区 根据post id 获取-->
      <el-skeleton :loading="!loaded">
        <div
          v-if="loaded"
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="disabled"
          class="comment-area"
        >
          <div class="comment-title">全部评论</div>
          <comment-card v-for="item in models.records" :data="item" />
        </div>
      </el-skeleton>
    </div>
    <!--侧边推广栏-->
    <div class="aside-area">
      <div class="aside-box" v-for="i in 2">
        <el-empty description="description" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { marked } from 'marked'
import { useRoute } from 'vue-router'
import { ref, computed, provide } from 'vue'
import { useUserStore } from '/src/store/user'
import { postComment } from '/src/api/comment'
import { getPostDetail, getPostComments } from '/src/api/post'
import '/src/styles/markdown-theme.scss'
import MetaInfo from '/src/components/MetaInfo/index.vue'
import ContentPublish from '/src/components/ContentPublish/index.vue'
import CommentCard from '/src/components/CommentCard/index.vue'
import { useGetPage } from '/src/hooks/content/useGetPage'
import { ElMessage } from 'element-plus'

const commentSize = 4
const user = useUserStore()
const post = ref(null)
const authorId = ref(null)
const inputText = ref(null)
const pid = useRoute().params.pid
const itemType = { itemType: 4, itemId: pid }

const placeText = computed(() =>
  user.hadLogin ? '发一条友善的评论' : `请先登录再发表(●'◡'●)`
)

const { loaded, models, disabled, loadMore, getPaging } = useGetPage(
  1,
  commentSize,
  getPostComments,
  { delay: 380 },
  pid
)

const handleReply = () => {
  postComment({
    parentId: 0,
    content: inputText.value,
    fromName: user.nickname,
    ...itemType,
  }).then((res) => {
    ElMessage({ type: 'success', message: res.msg })
    inputText.value = ''
    getPaging(1, commentSize, pid).then(loadMore)
  })
}

provide('uniReply', ref(null)) // 兄弟组件间通信
provide('authorId', authorId) // 注入作者id，为评论组件判断是否为作者
provide('itemType', itemType) // 为评论组件提供资源类型

// 根据文章id以获取文章具体内容
getPostDetail(pid).then((res) => {
  post.value = res.data
  authorId.value = res.data.uid
  document.title = res.data.title + ' - 二元'
})

// 获取文章下的评论列表
getPaging(1, commentSize, pid)

// https://www.jianshu.com/p/0b06128a6117 关于生产锚点
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

  > .content-publish {
    border: 1px solid #e0e0e0;
  }
}

// 评论区
.comment-area {
  padding: 12px 28px;
  margin-bottom: 24px;
  background: #ffffff;
  border: 1px solid #e0e0e0;

  > .comment-title {
    margin-bottom: 10px;
    font-size: 20px;
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
