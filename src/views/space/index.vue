<template>
  <div v-if="loading" class="user-space">
    <space-header :userinfo="userinfo" />
    <content-publish
      @reply="handleReply"
      :place-text="placeText"
      reply-text="发 表"
      v-model="inputText"
    />
    <div v-if="tweetList" class="tweet-list">
      <h2 v-if="isSelf">推文广场</h2>
      <h2 v-else>历史推文</h2>
      <div v-for="t in tweetList" class="tweet-card">
        <span v-html="processWx(t.content)" />
        <span class="time">{{ t.createdTime }}</span>
      </div>
      <el-empty v-if="tweetList.length === 0" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserInfoDigest } from '/src/api/user'
import SpaceHeader from './SpaceHeader.vue'
import ContentPublish from '/src/components/ContentPublish/index.vue'
import { getTweets, postTweet } from '../../api/tweet'
import { ElNotification } from 'element-plus'
import { useUserStore } from '../../store/user'
import { processWx } from '../../hooks/emotion/useEmotions'

const route = useRoute()
const router = useRouter()
const user = useUserStore()
const uid = Number(route.params.uid)
const loading = ref(false)
const userinfo = ref(null)
const tweetList = ref(null)
const inputText = ref('')
const placeText = '从这开始发表一条推文吧'
const isSelf = uid === user.uid

const handleReply = () => {
  postTweet(inputText.value).then((res) => {
    ElNotification({ type: 'success', message: res.msg })
    inputText.value = ''
    setTimeout(() => router.refresh(), 400)
  })
}

getUserInfoDigest(uid).then((res) => {
  loading.value = true
  userinfo.value = res.data
})
// 如果是进入自己的空间则看的是推文广场，否则看对方的推文 (随便设计，毕设很赶的)
getTweets(isSelf ? 0 : uid).then((res) => {
  tweetList.value = res.data
})
</script>

<style lang="scss" scoped>
.user-space {
  max-width: 1000px;
  min-height: 800px;
  margin: -8px auto 8px;
  overflow: hidden;

  border-radius: 2px;
}

.tweet-card {
  position: relative;
  padding: 24px 32px 32px;
  margin: 8px 0;
  background: #ffffff;
  border-radius: 6px;

  & > .time {
    position: absolute;
    right: 32px;
    bottom: 8px;
  }
}
</style>
