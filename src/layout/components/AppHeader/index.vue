<template>
  <header class="app-header">
    <div class="container">
      <!--响应式选择合适尺寸logo-->
      <a href="/">
        <img class="logo" alt="logo" src="/src/assets/images/logo.png" />
        <img
          class="logo-mobile"
          alt="logo"
          src="/src/assets/images/logo-64.png"
        />
      </a>
      <!--主导航栏 和 右侧导航-->
      <nav class="app-nav">
        <nav-list />
        <right-nav />
      </nav>
    </div>
  </header>
</template>

<script setup>
import NavList from './NavList.vue'
import RightNav from './RightNav.vue'
</script>

<style lang="scss" scoped>
.app-header {
  min-width: 1200px;
  height: 4rem;
  margin-bottom: 1rem;
  color: #909090;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
}

.container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1440px;
  height: 100%;
  margin: auto;

  .logo {
    display: inline-block;
    height: 50px;
    margin-right: 1.4rem;
  }

  .logo-mobile {
    display: none;
  }

  & > .app-nav {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
}

/*
// 暂不设计响应式
@media screen and (max-width: 640px) {
  .logo {
    display: none;
  }
  .logo-mobile {
    display: inline-block;
    height: 42px;
    margin-right: 1rem;
  }
}*/
</style>
