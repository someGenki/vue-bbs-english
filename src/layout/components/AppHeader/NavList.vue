<template>
  <ul class="nav-list">
    <nav-list-item
      v-for="nav in navs"
      :disabled="nav.meta.disabled"
      :newest="nav.meta.newest"
      :path="nav.path"
    >
      {{ nav.meta.navName }}
    </nav-list-item>
  </ul>
</template>

<script setup>
import NavListItem from './NavListItem.vue'
import navs from '/src/router/nav'
</script>

<style lang="scss" scoped>
.nav-list {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;

  height: 100%;
  padding-left: 0;
  margin-right: 2rem;

  font-size: 15px;
  list-style: none;
  border-bottom: none;
}
</style>
