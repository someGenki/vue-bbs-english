<template>
  <div>测试页面{{ $pinia.user.hadLogin }}
  <button @click="$router.push('/redirect')">btn</button>
  </div>
</template>

<script setup>



</script>

<style scoped></style>
