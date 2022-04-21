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
          <app-link :disabled="item.disabled" center :to="item.path">
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
  if (typeof fn === 'function') {
    fn(...args)
  }
}
</script>

<style lang="scss" scoped>
.dropdown-avatar {
  width: 2.6rem;
  height: 2.6rem;
  margin-top: 1px;
  margin-left: 4px;
  color: #4e5969;
  cursor: pointer;
  border-radius: 4px;
}
</style>
