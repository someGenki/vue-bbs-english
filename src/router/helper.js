import { h } from 'vue'
import { useRouter } from 'vue-router'

const redirectComponent = {
  name: 'Redirect',
  setup() {
    const { currentRoute, replace } = useRouter()
    const query = currentRoute.value.query
    const path = currentRoute.value.params.path
    const _path = '/' + (Array.isArray(path) ? path.join('/') : path)
    replace({ path: _path, query })
    return () => h('div')
  },
}

export const redirectRoute = {
  path: '/redirect/:path(.*)',
  name: 'Redirect',
  component: redirectComponent,
  meta: { title: '...' },
}
