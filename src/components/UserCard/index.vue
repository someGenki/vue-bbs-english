<template>
  <a class="user-card">
    <app-avatar
      :uid="data.uid"
      size="42px"
      :avatar="data.avatar"
      :nickname="data.nickname"
    />
    <div class="active-card-wrap">
      <div class="active-card-name">{{ data.nickname }}</div>
      <div>积分点:{{ data.point }}</div>
    </div>
    <slot></slot>
  </a>
</template>

<script setup>
const props = defineProps({
  data: { type: Object, required: true },
})
</script>

<style lang="scss" scoped>
.user-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 10px 12px;
  font-size: 14px;
  color: #919191;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
}

.active-card-wrap {
  margin-left: 12px;
}

.active-card-name {
  color: #2b2b2b;
}
</style>
