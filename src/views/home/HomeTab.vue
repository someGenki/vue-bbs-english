<template>
  <div class="tabs-wrap">
    <span
      v-for="item in postCategory"
      :class="{ selected: category === item.value }"
      @click="$router.replace({ params: { category: item.value } })"
      >{{ item.name }}
    </span>
  </div>
</template>

<script setup>
import { postCategory } from '/src/hooks/content/usePost'

defineProps({
  category: { type: String, required: true },
})
</script>

<style lang="scss" scoped>
@import '/src/styles/variables';
.tabs-wrap {
  margin-bottom: 18px;
  margin-left: 18px;
  font-size: 18px;
}

.tabs-wrap > span {
  position: relative;
  margin-right: 24px;
  color: #999;
  cursor: pointer;

  &.selected {
    color: $deep-blue;
  }

  &.selected::after {
    position: absolute;
    bottom: -8px;
    left: 50%;
    width: 26px;
    height: 4px;
    content: '';
    background-color: $deep-blue;
    border-radius: 8px;
    transform: translateX(-50%);
  }
}
</style>
