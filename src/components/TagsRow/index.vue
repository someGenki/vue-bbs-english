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
    <el-tag class="diff" v-if="difficulty" :color="difColor" effect="dark">
      {{ difText }}
    </el-tag>
  </div>
</template>

<script setup>
import {getDifficulty, splitTags} from '/src/hooks/content/useArticle'
// <tags-row :tags="data.tags" />
const props = defineProps({
  tags: {type: [String, Array], required: true},
  difficulty: {type: Number, default: 0},
})

const tagList = splitTags(props.tags)
const {difColor, difText} = getDifficulty(props.difficulty)
</script>

<style lang="scss" scoped>
.article-tags {
  margin-bottom: 14px;

  & > .el-tag {
    padding: 12px;
    margin-right: 12px;
    border: none;
  }
}
.diff{
  float: right;
}
</style>