import { createPinia } from 'pinia'
import { useUserStore } from './user'

const pinia = createPinia()

const modules = {
  user: null,
}

Object.defineProperty(pinia, 'user', {
  get: () => modules.user ?? (modules.user = useUserStore()),
})

export default pinia
