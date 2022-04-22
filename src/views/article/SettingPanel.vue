<template>
  <div class="setting">
    <el-checkbox v-model="settings.doubleTran" label="双击翻译选中单词" />
    <el-checkbox v-model="settings.boldText" label="正文内容字体加粗" />
    <!--字体大小-->
    <div>
      <span>字体大小:&nbsp;</span>
      <el-input-number
        size="small"
        v-model="settings.fontSize"
        :min="12"
        :max="24"
      />
    </div>
    <!--字体样式-->
    <div>
      <span>字体样式:&nbsp;</span>
      <el-select
        :style="selectStyle"
        v-model="settings.fontFamily"
        size="small"
      >
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <div>
      <span>选择字体颜色:&nbsp;</span>
      <el-color-picker v-model="settings.color" />
    </div>
    <div>
      <span>选择背景颜色:&nbsp;</span>
      <el-color-picker v-model="settings.backgroundColor" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { settings } = defineProps({
  settings: { type: Object, required: true },
})
const selectStyle = computed(() => ({
  width: '120px',
  fontFamily: settings.fontFamily,
}))
const options = [
  'cursive',
  'BreeSerif',
  'Consolas',
  'fangsong',
  'tahoma',
  'fantasy',
  'monospace',
  'arial',
  'sans-serif',
  'serif',
  'system-ui',
]
</script>

<style lang="scss" scoped>
.setting {
  position: fixed;
  display: flex;
  flex-direction: column;
  min-height: 60px;
  min-width: 120px;
  padding: 4px 12px;
  font-size: 14px;
  color: #5c5c5c;
  left: 0;
  top: 6rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: $box-shadow-base;

  & > * {
    margin-bottom: 8px;
  }

  :deep(.el-checkbox__label) {
    letter-spacing: 1px;
  }

  :deep(.el-input__inner) {
    font-size: 15px;
    text-align: center;
    font-family: inherit;
  }
}
</style>
