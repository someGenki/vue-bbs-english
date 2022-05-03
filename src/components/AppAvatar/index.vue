<template>
  <el-popover
    v-if="!needLogin || user.hadLogin"
    popper-class="app-avatar-popover"
    :show-arrow="false"
    :disabled="!showCard"
    placement="right-start"
    effect="light"
    width="300px"
    @show="loadInfo"
  >
    <user-info-card v-if="showCard && infos" :infos="infos" />
    <span v-else>加载中...</span>
    <template #reference>
      <router-link class="app-avatar" :data-uid="uid" :to="`/space/${uid}`">
        <img
          :style="{ width: size, height: size }"
          :class="{ rounded }"
          :src="avatar"
          v-default-img="nickname"
        />
      </router-link>
    </template>
  </el-popover>
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

<script setup>
import { ref } from 'vue'
import { getUserInfoDigest } from '/src/api/user'
import UserInfoCard from './UserInfoCard.vue'
import { useUserStore } from '/src/store/user'

const props = defineProps({
  uid: { type: [String, Number], required: true }, // user id 用于跳转
  nickname: { type: String, required: true }, // 用于图片加载失败时作为字符头像

  avatar: { type: String, default: '' }, // 图片url
  needLogin: { type: Boolean, default: false },
  rounded: { type: Boolean, default: true },
  showCard: { type: Boolean, default: false },
  background: { type: String, default: '#eee' },
  size: { type: String, default: '36px' },
})

const infos = ref(null)
const user = useUserStore()
const loadInfo = () => {
  if (infos.value === null) {
    getUserInfoDigest(props.uid).then((res) => (infos.value = res.data))
  }
}
</script>

<script>
/**
 * @example  <app-avatar :uid :avatar :nickname />
 * 浮动注意!
 */
export default {
  inheritAttrs: false,
  name: 'AppAvatar',
}
</script>

<style lang="scss" scoped>
@import '/src/styles/variables';

.app-avatar {
  float: left;
  overflow: hidden;
  user-select: none;
}

.rounded {
  overflow: hidden;
  border-radius: 50%;
}

.app-avatar-popover {
  padding: 0;
  border-radius: 12px;
}
</style>

<style>
.app-avatar-popover {
  padding: 0 !important;
  overflow: hidden;
  border-radius: 8px !important;
}
</style>
