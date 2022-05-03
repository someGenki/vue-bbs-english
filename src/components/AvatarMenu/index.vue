<template>
  <el-dropdown trigger="click">
    <!--位于header显示的头像-->
    <img
      class="dropdown-avatar"
      v-default-img="user.nickname"
      :src="avatar"
      alt=""
    />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in items"
          :key="item.title"
          :divided="item.divided"
          :disabled="item.disabled"
          @click="tryCall(item.handle)"
        >
          <app-link
            class="dropdown-item"
            :disabled="item.disabled"
            center
            :to="item.path"
          >
            <app-icon v-if="item.icon" :icon="item.icon" />
            {{ item.title }}
          </app-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useUserStore } from '/src/store/user'

defineProps({ items: { type: Array }, avatar: { type: String } })

const user = useUserStore()
const tryCall = (fn, ...args) => {
  if (typeof fn === 'function') fn(...args)
}
</script>

<style lang="scss" scoped>
.dropdown-avatar {
  width: 44px;
  height: 44px;
  margin-left: 6px;
  cursor: pointer;
  border-radius: 6px;
}
// 增大下拉菜单的可点击范围
.dropdown-item {
  position: relative;
  &::after {
    position: absolute;
    top: -5px;
    right: -16px;
    bottom: -5px;
    left: -16px;
    content: '';
  }
}
</style>
