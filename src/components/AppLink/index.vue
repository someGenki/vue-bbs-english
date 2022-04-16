<template>
  <component :class="{ disabled, center }" :is="is" v-bind="props">
    <span v-if="sharp" class="app-link__sharp">#</span>
    <slot />
  </component>
</template>

<script>
// vue内置组件component说明 https://v3.cn.vuejs.org/api/built-in-components.html#component
// 参考自 https://github.com/PanJiaChen/vue-element-admin/blob/master/src/layout/components/Sidebar/Link.vue

/**
 *   <app-link  :to="i.path"> xxx </app-link>
 *
 * component是内置组件，根据 :is='type' 来决定哪个组件被渲染
 * type是字符串，可以是html自带的标签如 'a' ，也可以是组件名称 'router-link'
 */
export default {
  name: 'AppLink',
  props: {
    // 跳转路径
    to: { type: String },
    // 是否禁用点击
    disabled: { type: Boolean, default: false },
    // 是否居中显示
    center: { type: Boolean, default: false },
    // 是否显示 `#` 符号
    sharp: { type: Boolean, default: false },
  },
  setup(props) {
    const { to } = props
    const is = to ? (isExternal(to) ? 'a' : 'router-link') : 'span'
    if (is === 'a') {
      return { is, props: { href: to, target: '_blank' } }
    } else if (is === 'router-link') {
      return { is, props: { to } }
    } else {
      return { is, props: {} }
    }
  },
}

function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
</script>

<style scoped>
.disabled {
  pointer-events: none;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
