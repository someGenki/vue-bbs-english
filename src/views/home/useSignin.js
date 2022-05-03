import { ref } from 'vue'
import { useUserStore } from '../../store/user'
import { doSignin, hasSignin } from '../../api/user'
import { ElNotification } from 'element-plus'

export function useSignin() {
  const user = useUserStore()
  const noSignin = ref(true) // true = 未签到过 false = 签到过了
  const handleSignin = () => {
    if (user['hadLogin']) {
      doSignin().then((res) => {
        ElNotification({ type: 'success', message: res.msg + '✨', offset: 80 })
        noSignin.value = false
      })
    } else {
      ElNotification({ type: 'warning', message: '请登录后尝试~' })
    }
  }
  if (user['hadLogin']) {
    hasSignin().then((res) => (noSignin.value = res.data))
  }
  return { noSignin, handleSignin }
}