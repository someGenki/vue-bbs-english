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
        :placeholder="placeText"
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
      {{ isModify ? '保 存' : '发 布' }}
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
      style="margin: 0 12px"
      auto-insert-space
      round
      @click="handles.store"
    >
      暂存
    </el-button>
    <avatar-menu :avatar="user.avatar" :items="items" />
  </app-header>
  <!-- markdown编辑器+其他内容 -->
  <main class="editor-main">
    <md-editor
      noKatex
      no-mermaid
      :prettier="false"
      placeholder="正文..."
      v-model="form.content"
      @onSave="handles.store"
      @onUploadImg="handles.upload"
    />
    <!--发布文章时，除标题和正文以外的其他属性设置-->
    <post-option
      v-if="type === 'post'"
      :success="handles.uploadSuccess"
      :form="form"
    />
    <!--发布帖子时，除标题和正文以外的其他属性设置-->
    <article-option
      v-if="type === 'article'"
      :form="form"
      :success="handles.uploadSuccess"
    />
    <!--如果有存在本地的草稿，则显示删除草稿按钮-->
    <el-button v-if="draft" @click="handles.clear" type="text">
      删除草稿
    </el-button>
    <span class="tip-text">{{ tipText }} </span>
  </main>
</template>

<script setup>
import { onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useEditor } from './useEditor'
import { useUserStore } from '/src/store/user'
import { getPostDetail } from '/src/api/post'
import PostOption from './PostOption.vue'
import ArticleOption from './ArticleOption.vue'
import AppHeader from '/src/components/AppHeader/index.vue'
import AvatarMenu from '/src/components/AvatarMenu/index.vue'
import { getArticle } from '/src/api/article'
import { keysOfPost } from '/src/hooks/content/usePost'
import { keysOfArticle } from '/src/hooks/content/useArticle'

const route = useRoute()
const router = useRouter()
const user = useUserStore()
const { type = 'post', id } = route.query // post or article

user.hadLogin ? user.getUserInfo() : router.replace('/login') // 保证已登录
watch(
  () => route.query,
  (o, n) => o.type !== n.type && router.refresh()
) // type变化刷新，重新加载组件，以执行一次setup()

const color = '#1d7dfa' // 按钮色调
const tipText = ref('...') // 页面最下方的提示栏
const isModify = ref(false) // 是否是编辑内容模式
// draft: 之前保存的草稿。wordCount: title的字数统计，placeText: title的提示文本
const { draft, wordCount, placeText, canSubmit, handles, form } =
  useEditor(type)

// 每三分钟自动保存一次草稿
const timer = setInterval(() => {
  handles.store()
  tipText.value = '自动保存保存:' + dayjs().format('YYYY-MM-DD HH:mm:ss')
}, 1000 * 60 * 3)

onUnmounted(() => clearInterval(timer))

// 下拉菜单项
const items = [
  { title: '个人中心', path: '/userinfo', icon: 'el-icon-user' },
  { title: '发布帖子', path: '/editor?type=post', icon: 'el-icon-document' },
  { title: '发布文章', path: '/editor?type=article', icon: 'el-icon-reading' },
  {
    title: '退出登录',
    divided: true,
    handle: () => user.logout(),
    icon: 'el-icon-switch-button',
  },
]

// 携带对应参数则进入编辑模式,加载数据库中的内容
if (id && type === 'post') {
  getPostDetail(id).then((res) => {
    if (res.data.uid !== user.uid) return
    keysOfPost.forEach((key) => (form[key] = res.data[key]))
    document.title = '修改 - ' + form.title
    isModify.value = true
  })
} else if (id && type === 'article') {
  getArticle(id).then((res) => {
    if (res.data.uid !== user.uid) return
    keysOfArticle.forEach((key) => (form[key] = res.data[key]))
    document.title = '修改 - ' + form.title
    isModify.value = true
  })
}
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

  & > .title-input {
    width: 100%;
    height: 100%;
    padding-right: 32px;
    margin-right: 32px;
    font-size: 24px;
    border: none;
    outline: none;
  }

  & > .word-count {
    position: absolute;
    right: 32px;
    font-size: 14px;
    color: #949494;
  }
}

.editor-main {
  margin-top: 5rem; // 因为header固定了
  background: #ffffff;

  & > .el-button {
    margin: 4px 16px;
  }

  .tip-text {
    margin: 4px 16px;
    font-size: 14px;
    color: #999;
  }
}

#md-editor-v3.md {
  min-height: calc(100vh - 4rem);
  margin-top: -1rem;
}
</style>
