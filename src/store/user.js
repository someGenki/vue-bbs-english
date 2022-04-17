import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from '/src/utils/storage'
import {
  login as _login,
  register as _register,
  getNewestInfo,
} from '/src/api/user'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    uid: -1,
    point: '',
    avatar: '',
    nickname: '',
    username: '',
  }),
  getters: {
    hadLogin: (state) => !!state.token,
  },
  actions: {
    async login(payload) {
      const { code, msg, data } = await _login(payload)
      if (code !== 200) {
        throw msg
      }
      this.saveUserInfo(data)
      return data
    },
    async register(payload) {
      const { code, data, msg } = await _register(payload)
      if (code !== 200) {
        throw msg
      }
      this.saveUserInfo(data)
      return data
    },
    async getUserInfo() {
      if (!this.hadLogin) return
      const { data, code, msg } = await getNewestInfo()
      if (code !== 200) {
        throw msg
      }
      this.saveUserInfo(data)
      return data
    },
    logout() {
      removeToken()
      localStorage.clear()
      location.reload()
    },
    saveUserInfo(info) {
      for (let key in info) {
        this[key] = info[key]
      }
      if (info.token) setToken(info.token)
    },
  },
})
