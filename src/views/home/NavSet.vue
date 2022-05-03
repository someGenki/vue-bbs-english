<template>
  <div class="nav-set">
    <div>
      <a class="more-item">关于</a>
      <a class="more-item">用户协议</a>
      <a class="more-item">隐私政策</a>
      <a class="more-item">使用指南</a>
    </div>
    <div>
      <a href="https://juejin.cn/" class="more-item">掘金</a>
      <a class="more-item">工作</a>
      <a class="more-item">出国</a>
      <a class="more-item">升学</a>
      <a class="more-item">交流</a>
    </div>
    <div>
      <a class="more-item">联系邮箱: 1159140147@qq.com</a>
    </div>
    <div>
      <a class="more-item" href="https://beian.miit.gov.cn"
        >闽ICP备20010420号-1</a
      >
    </div>
    <div>
      <a
        class="more-item"
        href="https://www.shdf.gov.cn/shdf/channels/740.html"
      >
        扫黄打非举报
      </a>
      <a class="more-item" href="https://www.12377.cn/">违法信息举报</a>
    </div>
    <div>
      <a class="more-item">©2022 二元论坛&nbsp;({{ lastBuildTime }})</a>
    </div>
  </div>
</template>

<script setup>
const lastBuildTime = __APP_INFO__.lastBuildTime || ''
</script>

<style lang="scss" scoped>
// 底部导航集合
.nav-set {
  margin-bottom: 24px;
  background: transparent !important;

  .more-item {
    font-size: 12px;
    color: #909090;
    cursor: pointer;
  }

  .more-item::after {
    margin: 0 0.4rem;
    color: #868b91;
    content: '·';
  }

  .more-item:last-child::after {
    content: '';
  }
}
</style>
