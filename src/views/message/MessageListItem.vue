<template>
  <div class="message-board-list-item">
    <div class="user">
      <img :src="model.avatar" class="avatar" v-default-img="model.nickname" />
      <span class="nickname">{{ model.nickname }}</span>
      <el-tag effect="dark" :type="isUser ? '' : 'success'" size="small">
        {{ isUser ? '用户' : '游客' }}
      </el-tag>
      <span class="os">{{ model.os }}</span>
      <span class="browser">{{ model.browser }}</span>
    </div>
    <div class="content">
      <span class="aite" v-if="model.toName">@{{ model.toName }}:</span>
      <span v-html="content"></span>
    </div>
    <div class="footer">
      <span v-if="user.hadLogin" class="reply-btn" @click="switchShow">
        回复TA
      </span>
      <span class="time">{{ model.gmtCreate }}</span>
      <span class="reply-count" v-if="model.childrenCount > 0">
        共{{ model.childrenCount }}条回复
      </span>
    </div>
    <content-publish
      v-if="showReply"
      v-model="inputText"
      :compact="true"
      :auto-focus="true"
      place-text="..."
      @reply="handleReply"
    />
    <div class="children" v-if="parent">
      <MessageListItem
        v-for="item in model.children"
        :model="item"
        :key="item.id"
        :parent="false"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEmotion } from '/src/hooks/emotion/useEmotions'
import { useComment } from '/src/hooks/content/useComment'
import { postMessage } from '/src/api/message'
import { useUserStore } from '/src/store/user'
import ContentPublish from '/src/components/ContentPublish/index.vue'
import { ElNotification } from 'element-plus'

const { model, parent } = defineProps({
  model: { type: Object, required: true },
  parent: { type: Boolean, default: false },
})
const isUser = computed(() => model.userId > 0)
const user = useUserStore()
const content = useEmotion().processWx(model.content)
const { switchShow, showReply, inputText } = useComment()
const handleReply = () => {
  postMessage({
    content: inputText.value,
    nickname: user.nickname,
    parentId: parent ? model.id : model.parentId,
  }).then((res) => {
    ElNotification({
      duration: 500,
      type: 'success',
      message: res.msg,
    })
    inputText.value = ''
    setTimeout(() => {
      location.reload()
    }, 520)
  })
}
</script>

<style lang="scss" scoped>
.message-board-list-item {
  position: relative;
  min-height: 90px;
  margin-top: 10px;
}

.user {
  display: flex;
  overflow: hidden;
  font-size: 0.9rem;
  white-space: nowrap; /*强制span不换行*/

  > * {
    margin-right: 10px;
    font-size: 12px;
  }

  .nickname {
    margin-left: 10px;
    font-size: 14px;
  }
}

.content {
  margin-top: -10px;
  margin-bottom: 10px;
  margin-left: 60px; /* img 40px margin total 20px 8*/

  > .aite {
    margin-right: 5px;
    color: #4949fc;
  }
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.footer {
  height: 30px;
  margin-left: 60px;
  line-height: 30px;

  > * {
    margin-right: 10px;
    font-size: 12px;
  }

  > .reply-btn {
    padding: 3px;

    &:hover {
      color: gray;
      cursor: pointer;
      background-color: #cecee0;
      border-radius: 5px;
    }
  }

  > .reply-count {
    float: right;
    // color: blueviolet;
    margin-right: 10px;
  }
}

.children {
  margin-top: 10px;
  margin-left: 60px;
  //border-bottom: 1px solid #d1d1d1;
  transition: 0.5s;
}
</style>
