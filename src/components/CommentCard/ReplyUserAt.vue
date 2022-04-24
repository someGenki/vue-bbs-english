<template>
  <span v-if="nickname">
    回复
    <router-link class="reply-user" :to="`/space/${uid}`">
      @{{ nickname }}:
    </router-link>
  </span>
</template>

<script>
export default {
  props: {
    uid: { type: [Number, String], required: true },
    nickname: { type: String },
  },
}
</script>

<style lang="scss" scoped>
.reply-user {
  color: #0593d0;

  &:hover {
    color: #02a8e3;
  }
}
</style>
