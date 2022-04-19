<template>
  <span>
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
    nickname: { type: String, required: true },
  },
}
</script>

<style lang="scss" scoped>
.reply-user {
  color: #008cc8;

  &:hover {
    color: #00aeec;
  }
}
</style>
