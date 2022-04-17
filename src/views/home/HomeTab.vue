<template>
  <div class="tabs-wrap">
    <span
      v-for="cs in postCategory"
      :class="{ selected: category === cs.value }"
      @click="$router.replace({ params: { category: cs.value } })"
      >{{ cs.name }}
    </span>
  </div>
</template>

<script setup>
import { postCategory } from '/src/hooks/post/usePost'

defineProps({
  category: { type: Object, required: true },
})
</script>

<style lang="scss" scoped>
 .tabs-wrap {
  margin-bottom: 20px;
  margin-left: 18px;
  font-size: 18px;
  //font-weight: bold;
  color: #999;
}

.tabs-wrap > span {
  position: relative;
  margin-right: 24px;
  cursor: pointer;

  &.selected {
    color: #569cf8;
  }

  &.selected::after {
    position: absolute;
    bottom: -8px;
    left: calc(50%);
    width: 24px;
    height: 4px;
    content: '';
    background-color: #569cf8;
    border-radius: 8px;
    transform: translateX(-50%);
  }
}
</style>
