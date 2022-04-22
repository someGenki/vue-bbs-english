<template>
  <app-header class="space-between fixed">
    <div class="contents">
      <input
        v-model="form.title"
        class="title-input"
        required
        autofocus
        minlength="4"
        maxlength="64"
        placeholder="请输入帖子标题（64字以内）"
      />
      <span class="word-count">{{ wordCount }}</span>
    </div>
    <!--头部右侧按钮组+头像下拉菜单-->
    <el-button
      @click="handles.submit"
      :disabled="!canSubmit"
      :color="color"
      size="large"
      auto-insert-space
      round
    >
      发布
    </el-button>
    <el-popconfirm
      v-if="draft"
      @confirm="handles.restore"
      title="是否加载本地缓存的草稿?"
    >
      <template #reference>
        <el-button size="large" auto-insert-space round>还原</el-button>
      </template>
    </el-popconfirm>
    <el-button
      size="large"
      :color="color"
      style="margin: 2px 12px"
      auto-insert-space
      round
      @click="handles.store"
    >
      暂存
    </el-button>
    <avatar-menu :avatar="user.avatar" :items="items" />
  </app-header>
  <main class="editor-main">
    <md-editor placeholder="正文..." v-model="form.content" />
    <!--发布文章时，除标题和正文以外的其他属性设置-->
    <post-option :success="handles.success" :form="form" />
  </main>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useUserStore } from '/src/store/user'
import { useEditor } from './useEditor'
import AppHeader from '/src/components/AppHeader/index.vue'
import AvatarMenu from '/src/components/AvatarMenu/index.vue'
import PostOption from './PostOption.vue'

// TODO markdown中的图片上传
const user = useUserStore()
const router = useRouter()

user.hadLogin ? user.getUserInfo() : router.replace('/login')

const form = reactive({
  title: '',
  content: '',
  category: 'default',
  tags: 'test',
  attachment: '',
  acAgreement: true,
})

const { color, draft, wordCount, canSubmit, handles } = useEditor(form)

const items = [
  { title: '个人中心', path: '/userinfo', icon: 'el-icon-user' },
  {
    title: '退出登录',
    divided: true,
    handle: () => user.logout(),
    icon: 'el-icon-switch-button',
  },
]
</script>

<style lang="scss" scoped>
.space-between {
  :deep(.container) {
    max-width: 100%;
    padding: 0 1rem;
  }
}

.contents {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  height: 100%;
  color: #484848;

  & > .title-input {
    width: 100%;
    height: 100%;
    padding-right: 32px;
    margin-right: 32px;
    font-size: 26px;
    border: none;
    outline: none;
  }

  & > .word-count {
    position: absolute;
    right: 32px;
    font-size: 14px;
  }
}

.editor-main {
  margin-top: 5rem; // 因为header固定了
  background: #ffffff;
}

.other-setting {
  padding: 16px 0 16px 32px;

  .category {
    margin-bottom: 16px;
  }

  .desc {
    display: inline-block;
    width: 100px;
  }

  .attachment {
    display: flex;

    :deep(.el-upload-dragger) {
      height: 120px;
    }

    .el-upload .app-icon {
      margin-top: 20px;
    }
  }

  .checkbox {
    display: flex;
    flex-direction: column;
  }

  .button-group {
    margin-top: 16px;
  }
}

#md-editor-v3.md {
  min-height: calc(100vh - 4rem);
  margin-top: -1rem;
}
</style>
