import { h } from 'vue'
import { useRouter } from 'vue-router'

const redirectComponent = {
  name: 'Redirect',
  setup() {
    const { currentRoute, replace } = useRouter()
    const query = currentRoute.value.query
    const path = currentRoute.value.params.path
    replace({ path, query })
    return () => h('div')
  },
}

export const redirectRoute = {
  path: '/redirect',
  name: 'Redirect',
  component: redirectComponent,
  meta: { title: '...' },
  beforeEnter: (to, from) => {
    to.query = from.query
    to.params.path = from.fullPath
  },
}
