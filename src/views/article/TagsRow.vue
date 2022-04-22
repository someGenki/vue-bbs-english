<template>
  <div class="article-tags">
    <el-tag
      v-for="tag in tagList"
      :key="tag.name"
      :color="tag.color"
      effect="dark"
      round
    >
      {{ tag.name }}
    </el-tag>
    <el-tag :color="dif.difColor" effect="dark">{{ dif.difText }}</el-tag>
  </div>
</template>

<script setup>
const props = defineProps({
  tagList: { type: Array, required: true },
  dif: { type: Object },
})
</script>

<style lang="scss" scoped>
.article-tags {
  margin-bottom: 14px;

  & > .el-tag {
    padding: 12px;
    margin-right: 12px;
    border: none;

    &:last-child {
      float: right;
    }
  }
}
</style>
