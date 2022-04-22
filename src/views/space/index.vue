<template>
  <div v-if="loading" class="user-space">
    <space-header :userinfo="userinfo" />
    div.
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getUserInfoDigest } from '/src/api/user'
import SpaceHeader from './SpaceHeader.vue'

const route = useRoute()
const uid = route.params.uid
const loading = ref(false)
const userinfo = ref(null)

getUserInfoDigest(uid).then((res) => {
  loading.value = true
  userinfo.value = res.data
})
</script>

<style lang="scss" scoped>
.user-space {
  max-width: 1000px;
  min-height: 800px;
  margin: -8px auto 8px;
  overflow: hidden;

  border-radius: 2px;
}
</style>
