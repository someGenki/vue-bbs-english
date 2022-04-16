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
  line-height: 4rem;
  color: #575767;
  white-space: nowrap;
  cursor: pointer;

  > [class$='-tip'] {
    position: absolute;
    top: 6px;
    left: 10px;
    height: 20px;
    padding: 1px 5px;
    font-size: 14px;
    line-height: 15px;
    color: #fff;
    white-space: nowrap;
    border: 1px solid #fff;
    border-radius: 50px;
    transform: scale(0.65);
    user-select: none;
  }

  > .disabled-tip {
    background: #e6a23c;
  }

  > .newest-tip {
    background: #f64242;
  }
}

.nav-list-item.active {
  color: #1e80ff;
}

.nav-list-item.disabled {
  color: #c9c9c9;
  pointer-events: none;
}

.nav-list-item:hover {
  color: #262323;
  border-bottom: 2px solid #1e80ff;
}
</style>
