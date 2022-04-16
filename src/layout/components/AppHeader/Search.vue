<template>
  <div class="search">
    <input type="text" name="search" placeholder="搜索" />
    <button>
      <app-icon color="white" icon="el-icon-search" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
$primary-color: #09a8db;
.search {
  position: relative;
  width: 160px;
  margin-right: 1.6rem;

  > input {
    width: calc(100% - 16px);
    height: 35px;
    padding: 0 20px 0 10px;

    border: none;
    border-radius: 40px;
    outline: 1px solid #cfcfcf;
    transition: 0.3s;
    &:focus {
      outline: 1px solid $primary-color;
      width: 100%;
    }
    &:focus+button{
      transform: rotate(90deg);
      right: 0;
    }
  }

  > button {
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
