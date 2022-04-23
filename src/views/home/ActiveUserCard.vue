<template>
  <a class="active-user-card">
    <app-avatar
      :uid="user.uid"
      size="42px"
      :avatar="user.avatar"
      :nickname="user.nickname"
    />
    <div class="active-card-wrap">
      <div class="active-card-name">{{ user.nickname }}</div>
      <div>积分点:{{ user.point }}</div>
    </div>
  </a>
</template>

<script setup>
const props = defineProps({
  user: { type: Object, required: true },
})
</script>

<style lang="scss" scoped>
.active-user-card {
  display: flex;
  padding: 10px 12px;
  font-size: 14px;
  align-items: flex-start;
  cursor: pointer;
  color: #919191;
}

.active-card-wrap {
  margin-left: 12px;
}

.active-card-name {
  color: #2b2b2b;
}
</style>
