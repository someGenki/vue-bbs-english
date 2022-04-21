<template>
  <app-header class="fixed">
    <!--主导航栏 和 右侧导航-->
    <nav class="app-nav">
      <nav-list :navs="navs" />
      <right-nav />
    </nav>
  </app-header>
  <main class="app-main">
    <router-view />
  </main>
</template>

<script setup>
import AppHeader from '/src/components/AppHeader/index.vue'
import NavList from './components/NavList.vue'
import RightNav from './components/RightNav.vue'
import navs from '/src/router/nav'
import { useUserStore } from '/src/store/user'

const user = useUserStore()

if (user.hadLogin) user.getUserInfo()
</script>

<style lang="scss" scoped>
.app-nav {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.app-main {
  min-width: 1200px;
}
</style>
