<template>
  <div class="post-card-footer">
    <span class="svg-item thumbs-up"><i />{{ data.likes }}</span>
    <span class="svg-item view"><i />{{ data.pv }}</span>
    <span class="svg-item messenger"><i />{{ data.comments }}</span>
    <span class="divide">|</span>
    <span class="item time">{{ timeStr }}</span>
    <el-tag
      v-if="data.tags"
      class="post-tag"
      :color="tagColor"
      effect="dark"
      type="info"
    >
      {{ data.tags }}
    </el-tag>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { getStrColor } from '/src/utils/process'

const { data } = defineProps({
  data: { type: Object, required: true },
})

const timeStr = dayjs().to(data.gmtCreate)
const tagColor = getStrColor(data.tags)
</script>

<style lang="scss" scoped>
.post-card-footer {
  position: absolute;
  bottom: 8px;
  display: flex;
  align-items: center;
  margin-left: 45px;

  color: #4e5969;
  user-select: none;

  // 分割线 ` | `
  .divide {
    margin-right: 14px;
    font-size: 12px;
    color: #999;
  }

  // 重置svg的光标样式
  .svg-item > i {
    cursor: default;
  }

  // 卡片标签
  .post-tag {
    height: 22px;
    margin-left: auto;
    border: none;
  }
}
</style>
