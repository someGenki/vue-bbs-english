<template>
  <router-link class="app-avatar" :data-uid="uid" :to="`/space/${uid}`">
    <img
      :style="{
        width: size + 'px',
        height: size + 'px',
      }"
      :src="avatar"
      v-default-img="nickname"
      alt=""
    />
  </router-link>
</template>

<script setup>
defineProps({
  uid: { type: [String, Number], required: true },
  avatar: { type: String, required: true },
  nickname: { type: String, required: true },
  size: { type: [String,Number], default: 36 },
})
</script>

<style lang="scss" scoped>
.app-avatar {
  & > img {
    display: block;
    float: left;
    width: 36px;
    height: 36px;

    overflow: hidden;
    vertical-align: middle;
    background: #dadada;
    border-radius: 50%;
  }
}
</style>
