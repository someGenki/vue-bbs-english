<template>
  <router-link
    v-if="!needLogin || $pinia.user.hadLogin"
    class="app-avatar"
    :data-uid="uid"
    :to="$paths.space(uid)"
  >
    <img
      :style="{ width: size, height: size }"
      :class="{ rounded }"
      :src="avatar"
      v-default-img="nickname"
    />
  </router-link>
  <!--需要登录但又没登录时的缺省头像-->
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
 * @example  <app-avatar :uid :avatar :nickname />
 * 浮动注意!
 */
export default {
  inheritAttrs: false,
  props: {
    uid: { type: [String, Number], required: true }, // user id 用于跳转
    nickname: { type: String, required: true }, // 用于图片加载失败时作为字符头像

    avatar: { type: String, default: '' }, // 图片url
    needLogin: { type: Boolean, default: false },
    rounded: { type: Boolean, default: true },
    background: { type: String, default: '#eee' },
    size: { type: String, default: '36px' },
  },
}
</script>

<style lang="scss" scoped>
.app-avatar {
  float: left;
  overflow: hidden;
  user-select: none;
}

.rounded {
  overflow: hidden;
  border-radius: 50%;
}
</style>
