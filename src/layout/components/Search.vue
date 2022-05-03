<template>
  <div class="search">
    <input
      @keydown.enter="goSearch"
      id="search-input"
      @click=""
      v-model="text"
      type="text"
      placeholder="搜索"
    />
    <button @click="goSearch">
      <app-icon color="white" icon="el-icon-search" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const text = ref('')
const goSearch = () =>
  text.value && router.push({ path: '/search', query: { q: text.value } })
</script>

<style lang="scss" scoped>
$primary-color: #09a8db;
.search {
  position: relative;
  width: 160px;
  margin-right: 1.6rem;

  & > input {
    width: calc(100% - 16px);
    height: 35px;
    padding: 0 20px 0 10px;
    background-color: #f5f5f5;
    border: 1px solid #cfcfcf;

    //border: 0;
    border-radius: 40px;
    outline: none;
    transition: 0.3s;

    &::placeholder {
      color: #999;
    }

    &:focus {
      width: 100%;
      background: #ffffff;
      border: 1px solid $primary-color;
    }

    &:focus + button {
      right: 0;
      transform: rotate(90deg);
    }
  }

  & > button {
    position: absolute;
    right: 16px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 35px;
    height: 35px;

    font-size: 1.05rem;
    cursor: pointer;
    background-color: $primary-color;

    border: none;
    border-radius: 50%;
    outline: none;
    transition: 0.3s;

    &:hover {
      background: linear-gradient($primary-color, #036eb8);
    }
  }
}
</style>
