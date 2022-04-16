<template>
  <div class="right-nav">
    <Search />
    <div class="publish-content">
      <app-icon size="20" icon="el-icon-edit" />
      <span>发布内容</span>
    </div>
    <template v-if="user.hadLogin">
      <button class="read-chat">
        <app-icon size="20" icon="el-icon-bell-filled" />
      </button>
      <button class="read-message">
        <app-icon size="20" icon="el-icon-message" />
      </button>
      <avatar-menu :items="items" />
    </template>
    <div class="login" @click="goLogin" v-else>登录</div>
  </div>
</template>

<script setup>
import Search from './Search.vue'
import AvatarMenu from './AvatarMenu.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '/src/store/user'

const user = useUserStore()
const router = useRouter()

const items = [
  { title: '个人中心', path: '/profile', icon: 'el-icon-user' },
  { title: '测试页面', path: '/test', icon: 'el-icon-warning' },
  {
    title: '项目地址',
    path: 'https://github.com/someGenki/vue-lite-admin',
    icon: 'el-icon-link',
  },
  { title: '不可点击', path: '/', disabled: true, icon: 'el-icon-close' },
  {
    title: '退出登录',
    divided: true,
    handle: () => user.logout(),
    icon: 'el-icon-switch-button',
  },
]

function goLogin() {
  const route = router.currentRoute.value
  if (route.path.includes('/login')) return
  router.push({ path: '/login', query: { redirect: route.fullPath } })
}

user.getUserInfo()
</script>

<style lang="scss" scoped>
$primary-color: #09a8db;

.right-nav {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  margin: 0;

  & > * {
    cursor: pointer;
    user-select: none;
  }
}

// 消息查看按钮和聊天按钮 🔔 & 📧
.right-nav > [class^='read-'] {
  width: 35px;
  padding: 4px;
  margin-right: 1rem;
  color: #8a919f;
  background: transparent;
  border: none;
  border-radius: 4px;
  outline: none;

  &:hover {
    color: $primary-color;
  }
}
// 发布内容 按钮
.right-nav > .publish-content {
  display: flex;
  align-items: center;
  height: 38px;
  padding: 4px 14px;
  margin-right: 1rem;
  font-size: 14px;
  color: #fff;
  white-space: nowrap;
  background: $primary-color;
  border-radius: 4px;
}

// 登录 按钮
.right-nav > .login {
  padding: 6px 16px;
  margin-left: 1rem;
  color: #007fff;
  white-space: nowrap;
  background: #f5f9ff;
  border: 1px solid $primary-color;
  border-radius: 4px;
}
</style>
