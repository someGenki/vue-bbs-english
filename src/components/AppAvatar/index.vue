<template>
  <router-link
    v-if="!myself || $pinia.user.hadLogin"
    class="app-avatar"
    :data-uid="uid"
    :to="`/space/${uid}`"
  >
    <img
      :style="{ width: size, height: size }"
      :class="{ rounded }"
      :src="avatar"
      v-default-img="nickname"
      alt="avatar"
    />
  </router-link>
  <app-icon
    v-else
    color="gray"
    icon="el-icon-avatar"
    :style="{ background }"
    :class="{ rounded }"
    :size="size"
  />
</template>

<script>
/**
 * @example  <app-avatar size="40px" v-bind="info" />
 * 浮动注意 size:36px; 时右侧组件 margin-left: 46px;
 */
export default {
  inheritAttrs: false,
  props: {
    uid: { type: [String, Number], required: true },
    avatar: { type: String, required: true },
    nickname: { type: String, required: true },
    // 等同于 need-login 为true，但未登录时显示默认灰色头像
    myself: { type: Boolean, default: false },
    size: { type: String, default: '36px' },
    rounded: { type: Boolean, default: true },
    background: { type: String, default: '#EEEEEE' },
  },
}
</script>

<style lang="scss" scoped>
.app-avatar {
  float: left;
  user-select: none;
}

.rounded {
  overflow: hidden;
  border-radius: 50%;
}
</style>
