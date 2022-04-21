<template>
  <li
    class="nav-list-item"
    :class="{ active: $route.path === path, disabled }"
    @click="$router.push(path)"
  >
    <span><slot /></span>
    <!-- <span class="disabled-tip" v-if="disabled">OFF</span> -->
    <span class="newest-tip" v-if="newest">NEW</span>
  </li>
</template>

<script setup>
defineProps({
  path: { type: String, required: true },
  disabled: { type: Boolean },
  newest: { type: Boolean },
})
</script>

<style lang="scss" scoped>
.nav-list-item {
  position: relative;
  max-height: 4rem;
  font-size: 16px;
  line-height: 4rem;
  color: #575767;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;

  &.active {
    color: #1e80ff;
  }

  &.disabled {
    color: #c9c9c9;
    pointer-events: none;
  }

  &:hover {
    color: #262323;
    border-bottom: 2px solid #1e80ff;
  }
}

// 右上角标样式
.nav-list-item > [class$='-tip'] {
  position: absolute;
  top: 6px;
  left: 10px;
  height: 20px;
  padding: 1px 5px;
  font-size: 14px;
  line-height: 15px;
  color: #fff;
  white-space: nowrap;
  user-select: none;
  border: 1px solid #fff;
  border-radius: 50px;
  transform: scale(0.6);
}

.nav-list-item > .disabled-tip {
  background: #e6a23c;
}

.nav-list-item > .newest-tip {
  background: #f74f4f;
}
</style>
