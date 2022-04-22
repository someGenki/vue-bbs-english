<template>
  <div class="message-board-add">
    <!-- 文本输入框-->
    <el-input
      type="textarea"
      :clearable="true"
      :autosize="{ minRows: 5, maxRows: 8 }"
      placeholder="请留下和谐友善的言论哦"
      v-model="form.content"
    />
    <div class="toolbar">
      <app-emotion @emotion="handleEmotion" />
      <div class="ops">
        <el-input
          v-model="form.nickname"
          v-show="!user.hadLogin"
          style="width: 150px"
          maxlength="10"
          prefix-icon="el-icon-user"
          show-word-limit
          placeholder="输入昵称"
        />
        <button
          @click="handleSubmit"
          :disabled="!form.content || !form.nickname"
          class="submit-btn"
        >
          提交留言
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { postMessage } from '/src/api/message'
import { useUserStore } from '/src/store/user'
import { ElMessage } from 'element-plus'
import AppEmotion from '/src/components/AppEmotion/index.vue'

const props = defineProps({
  // 要对留言回复的那条留言的id
  toId: { type: Number, default: 0 },
  // 要对留言回复的那条留言的发表人昵称
  toName: { type: String, default: null },
  // 要对留言回复的那条留言所在的父级留言的id,对父级留言则,2个相同
  parentId: { type: Number, default: 0 },
})

const user = useUserStore()

const form = reactive({
  content: '',
  nickname: user.nickname || '',
  parentId: props.parentId,
  toName: props.toName,
  toId: props.toId,
})
const handleEmotion = (text) => {
  form.content += text
}
const handleSubmit = () => {
  postMessage(form).then(() => {
    ElMessage({
      type: 'success',
      message: '发送成功，芜湖！',
    })
    location.reload()
  })
}
</script>

<style lang="scss" scoped>
.message-board-add {
  position: relative;
}

.toolbar {
  height: 40px;
  margin-top: 4px;
  //昵称、提交按钮
  .ops {
    float: right;

    .submit-btn {
      height: 32px;
      margin-left: 5px;
      color: white;
      cursor: pointer;
      background: #00a1d6;
      border-radius: 5px;

      &:disabled {
        cursor: not-allowed;
        background-color: #87939a;
      }
    }
  }

  //表情盒子 未实现
  .emotions {
    float: left;
  }
}
</style>
