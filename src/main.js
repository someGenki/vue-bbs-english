import { createApp, h } from 'vue'
import { RouterView } from 'vue-router'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import pinia from '/src/store'
import router from '/src/router'
import '/src/styles/common.scss'
import '/src/styles/variables.scss'
import '/src/styles/markdown-theme.scss'
import { globalRegister } from '/src/utils/compRegister'
import defaultImg from '/src/directives/default-img'
import AppIcon from '/src/components/AppIcon/index.vue'
import AppLink from '/src/components/AppLink/index.vue'
import AppAvatar from '/src/components/AppAvatar/index.vue'

const app = createApp({ render: () => h(RouterView) })

globalRegister(app, ElIcons, { prefix: 'elIcon' })

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

app.use(router).use(pinia).use(ElementPlus, { locale: zhCn })

app.directive('default-img', defaultImg)

app.component('app-icon', AppIcon)
app.component('app-link', AppLink)
app.component('app-avatar', AppAvatar)

app.config.globalProperties.$paths = { space: (uid) => `/space/${uid}` }

app.mount('#app')