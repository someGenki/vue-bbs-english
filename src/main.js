import { createApp, h } from 'vue'
import { RouterView } from 'vue-router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

import pinia from './store/index.js'
import router from './router'
import { globalRegister } from './utils/compRegister'
import defaultImg from '/src/directives/default-img'
import AppIcon from '/src/components/AppIcon/index.vue'
import AppLink from '/src/components/AppLink/index.vue'
import AppAvatar from '/src/components/AppAvatar/index.vue'


const app = createApp({ render: () => h(RouterView) })

globalRegister(app, ElIcons, { prefix: 'elIcon' })

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

app.use(router).use(pinia).use(ElementPlus)

app.directive('default-img', defaultImg)

app.component('app-icon', AppIcon)
app.component('app-link', AppLink)
app.component('app-avatar', AppAvatar)

app.mount('#app')
