import { defineStore } from 'pinia'
import { get, getToken, removeToken, set, setToken } from '/src/utils/storage'
import { getNewestInfo, login as _login, register } from '/src/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    uid: Number(get('uid')) || -1,
    avatar: get('avatar') || '',
    nickname: get('nickname') || '',
    point: -1,
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
    async signup(payload) {
      const { code, data, msg } = await register(payload)
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
        set(key, info[key])
      }
      if (info.token) setToken(info.token)
    },
  },
})
