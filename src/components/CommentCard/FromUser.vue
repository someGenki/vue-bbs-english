<template>
  <div class="from-user">
    <router-link :to="`/space/${uid}`">
      {{ nickname }}
    </router-link>
    <span class="isAuthor" v-if="authorId === uid">(楼主)</span>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  uid: { type: Number, required: true },
  nickname: { type: String, required: true },
})

const authorId = inject('authorId') // refImpl!
</script>

<style lang="scss" scoped>
@import '/src/styles/_variables';

.from-user {
  margin-right: 6px;
  font-size: 15px;
  color: #5c5c5c;

  & > .isAuthor {
    margin-left: 6px;
    color: $mild-gray;
  }
}
</style>
