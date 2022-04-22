<template>
  <div id="a-setting" class="setting" :class="{ folded }">
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
          v-for="item in fontOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <!--字体颜色-->
    <div>
      <span>选择字体颜色:&nbsp;</span>
      <el-color-picker size="small" v-model="settings.color" />
    </div>
    <!--背景颜色-->
    <div>
      <span>选择背景颜色:&nbsp;</span>
      <el-color-picker size="small" v-model="settings.backgroundColor" />
    </div>

    <app-icon
      @click="folded = !folded"
      class="fold-btn"
      icon="el-icon-d-arrow-left"
    />
    <!--    <app-icon
          v-else
          @click="folded = false"
          class="fold-btn"
          icon="el-icon-d-arrow-right"
        />-->
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const { settings } = defineProps({
  settings: { type: Object, required: true },
})
const folded = ref(false)
const selectStyle = computed(() => ({
  width: '120px',
  fontFamily: settings.fontFamily,
}))
const fontOptions = [
  'BreeSerif',
  'cursive',
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
  top: 6rem;
  left: 0;
  display: flex;
  flex-direction: column;
  min-width: 120px;
  min-height: 60px;
  padding: 4px 12px;
  font-size: 14px;
  color: #5c5c5c;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: $box-shadow-base;
  transition: all 300ms ease;

  & > * {
    margin-bottom: 8px;
  }

  :deep(.el-checkbox__label) {
    letter-spacing: 1px;
  }

  :deep(.el-input__inner) {
    font-family: inherit;
    font-size: 15px;
    text-align: center;
  }

  & > .fold-btn {
    position: absolute;
    top: 16px;
    right: -12px;
    padding: 2px;
    cursor: pointer;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 50%;
    transition: all 200ms;

    &:hover {
      border-color: #bbb;
      transform: scale(1.1);
    }
  }

  &.folded {
    transform: translateX(-100%);

    & > .fold-btn {
      transform: rotateY(180deg);
    }
  }
}
</style>
