<template>
  <div class="post-view">
    <div class="main-area">
      <!--骨架屏包裹 主体内容展示[Markdown] + 回帖输入框 -->
      <article v-if="post" class="post-area">
        <h1 class="article-title">{{ post.title }}</h1>
        <meta-info @like="handleLike" :had-like="hadLike" :article="post" />
        <div class="markdown-body" v-html="marked(post.content)" />
        <div v-if="post.attachment" class="attachment-box">
          <div>帖子相关附件：</div>
          <app-icon color="#28AFEA" size="54" icon="el-icon-document-add" />
          <span>&nbsp;请自行甄别文件是否安全！！！</span>
          <el-button color="#626aef" class="download-attachment">
            <a :href="post.attachment" target="_blank">下载附件</a>
          </el-button>
        </div>
      </article>
      <!--回帖输入框-->
      <content-publish
        title="评论"
        @reply="handleReply"
        :place-text="placeText"
        v-model="replyText"
      />
      <!--评论区列表-->
      <post-comment-list ref="commentList" :pid="pid" />
    </div>
    <!--侧边推广栏-->
    <div class="aside-area">
      <img class="aside-aed" src="/src/assets/images/ead01.png" alt="" />
      <div class="aside-box">
        <el-empty description="暂无数据" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { marked } from 'marked'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import { computed, provide, ref } from 'vue'
import { useUserStore } from '/src/store/user'
import { postComment } from '/src/api/comment'
import { getPostDetail } from '/src/api/post'
import PostCommentList from './PostCommentList.vue'
import MetaInfo from '/src/components/MetaInfo/index.vue'
import ContentPublish from '/src/components/ContentPublish/index.vue'
import { doLike, doUnlike, isLike } from '/src/api/like'

const user = useUserStore()
const router = useRouter()
const post = ref(null)
const hadLike = ref(false)
const authorId = ref(null)
const replyText = ref(null)
const commentList = ref(null)
const pid = useRoute().params.pid
const itemType = { itemType: 4, itemId: Number(pid) }

const placeText = computed(() =>
  user.hadLogin ? '发一条友善的评论' : `请先登录再发表(●'◡'●)`
)

// 根据文章id以获取文章具体内容
getPostDetail(pid).then(
  (res) => {
    if (res.code === 2011) {
      return router.push('/404')
    }
    post.value = res.data
    authorId.value = res.data.uid
    document.title = res.data.title + ' - 二元'
  },
  (err) => {
    ElNotification({ type: 'error', message: err.data.data })
  }
)

const handleReply = () => {
  if (!user.hadLogin) return
  postComment({
    parentId: 0,
    content: replyText.value,
    fromName: user.nickname,
    ...itemType,
  }).then((res) => {
    ElMessage({ type: 'success', message: res.msg })
    replyText.value = ''
    commentList.value.reLoadMore()
  })
}
const handleLike = () => {
  if (!user.hadLogin) return
  hadLike.value
    ? doUnlike(4, pid).then(() => (hadLike.value = false))
    : doLike(4, pid).then(() => (hadLike.value = true))
}
provide('uniReply', ref(null)) // 用于兄弟组件间通信
provide('authorId', authorId) // 注入作者id，为评论组件判断是否为作者
provide('itemType', itemType) // 为评论组件回复提供资源类型

user.hadLogin && isLike(4, pid).then((res) => (hadLike.value = res.data))

// https://www.jianshu.com/p/0b06128a6117 关于生成锚点
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

// 正文展示
.post-area {
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

  > .attachment-box {
    position: relative;
    min-height: 70px;
    padding: 8px 16px;
    font-size: 14px;
    color: #7b7b7b;
    border-radius: 4px;

    > .download-attachment {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }

    > .app-icon {
      margin: 8px 4px;
      border-radius: 4px;
    }
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
  .aside-aed {
    width: 100%;
    padding: 16px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    object-fit: contain;
  }
}
</style>
