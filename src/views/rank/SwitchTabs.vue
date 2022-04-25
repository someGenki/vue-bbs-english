<template>
  <nav class="switch-tabs">
    <span
      class="tabs-item"
      v-for="(v, k) in tabs"
      @click="emit('left', k)"
      :class="{ active: left === k }"
      v-text="v"
    />
    <el-dropdown class="tabs-item">
      <span class="choose-by">
        {{ info[left][right] }}
        <app-icon icon="el-icon-arrow-down" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(v, k) in info[left]"
            @click="emit('right', k)"
          >
            {{ v }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </nav>
</template>

<script setup>
const props = defineProps({
  left: { type: String },
  right: { type: String },
  info: { type: Object },
  tabs: { type: Object },
})
const emit = defineEmits(['left', 'right'])
</script>

<style lang="scss" scoped>
.switch-tabs {
  display: flex;
  align-items: center;
  height: 48px;

  .choose-by {
    display: inline-flex;
    align-items: center;
    font-size: 14px;

    & > .app-icon {
      margin-left: 4px;
    }
  }

  .tabs-item {
    margin: 12px 16px;
    cursor: pointer;

    &.active {
      color: #1e80ff;
    }

    &:last-child {
      margin-left: auto;
    }
  }
}
</style>
