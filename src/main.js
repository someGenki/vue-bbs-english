import { createApp, h } from 'vue'
import { RouterView } from 'vue-router'
import pinia from './store/index.js'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import { globalRegister } from './utils/compRegister'
import AppIcon from '/src/components/AppIcon/index.vue'
import AppLink from '/src/components/AppLink/index.vue'
import defaultImg from '/src/directives/default-img'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

const app = createApp({ render: () => h(RouterView) })

globalRegister(app, ElIcons, { prefix: 'elIcon' })
dayjs.locale('zh-cn') // 使用本地化语言
dayjs.extend(relativeTime) // 使用插件

app.use(router).use(pinia).use(ElementPlus)

app.directive('default-img', defaultImg)

app.component('app-icon', AppIcon)
app.component('app-link', AppLink)

app.mount('#app')
