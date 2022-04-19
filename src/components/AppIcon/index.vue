<template>
  <i v-bind="$attrs" class="app-icon" :class="{ text }">
    <el-icon v-if="iconType === 'el'" v-bind="iconProp">
      <component :is="iconName" />
    </el-icon>
    <svg v-else v-bind="iconProp">
      <use :xlink:href.attr="iconName" />
    </svg>
    <span v-if="text">{{ text }}</span>
  </i>
</template>

<script setup>
import { ElIcon } from 'element-plus'

/**
 * <app-icon icon="el-icon-right" />      el-开头将渲染成 <i/> el图标支持小驼峰和中划线分割命名
 * <app-icon icon="github" size="32" />   其他则渲染成  <svg>
 *
 * 附： 动态组件 <component :is="xxx" />模板编译的结果：_resolveDynamicComponent(xxx)
 * 该函数被定义在 runtime-core/src/helpers/resolveAssets.ts，内部调用app.context获取对应已注册的组件
 * component 内置组件除了支持 is 绑定之外，也支持其他属性绑定和事件绑定
 *
 * 如果svg标签的path标签已设置fill="color" 则该path的颜色也不会被更改
 */
const props = defineProps({
  icon: { type: String, required: true },
  size: { default: 16 },
  color: { default: 'inherit' },
  text: { type: [String,Number] },
})

const { icon, color, size } = props

let iconType, iconName, iconProp

// 如果是el-icon类型 则使用全局注册的el-icon
if (/^el-?/i.test(icon)) {
  iconType = 'el'
  iconName = icon
  iconProp = { color, size: parseInt(size) }
} else {
  // 否则使用svg sprites图标
  iconType = 'custom'
  iconName = '#icon-' + icon
  const sizePx = parseInt(size) + 'px'
  const style = { width: sizePx, height: sizePx }
  if (color) {
    style.color = color
    style.fill = 'currentColor'
  }
  iconProp = { style }
}
</script>

<style>
.app-icon {
  display: inline-flex;
}

.app-icon.text {
  align-items: center;
  cursor: pointer;
}
.app-icon.text:hover {
  color: #1d7dfa;
}
</style>
