import { defineStore } from 'pinia'
import { getToken, removeToken, setToken, get, set } from '/src/utils/storage'
import { login as _login, register, getNewestInfo } from '/src/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    uid: get('uid') || -1,
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
      try {
        const { code, data } = await register(payload)
        if (code === 200) {
          this.saveUserInfo(data)
          return data
        }
      } catch (e) {
        // 这里有后端的设计失误。。。
        throw e.data.msg
      }
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
