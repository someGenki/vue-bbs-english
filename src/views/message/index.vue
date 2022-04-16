<template>
  <div class="message-board">
    <div class="message-board-top">
      <h2 style="text-align: center">欢迎给该网站留下建设性的意见❤</h2>
      <img
        class="pic"
        alt="noteTaking"
        src="/src/assets/images/note_taking.svg"
      />
    </div>
    <message-add />
    <message-list />
  </div>
</template>

<script setup>
import MessageAdd from './MessageAdd.vue'
import MessageList from './MessageList.vue'
</script>

<style lang="scss" scoped>
.message-board {
  max-width: 800px;
  margin: 10px auto 0;
}

.message-board-top > .pic {
  display: block;
  max-width: 400px;
  margin: -45px auto -45px;
}
</style>
