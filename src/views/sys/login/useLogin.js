import { reactive, toRaw, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useUserStore } from '/src/store/user'
import { getParams } from '/src/utils/process'

const loginFormObj = import.meta.env.DEV
  ? {
      username: 'jojo2',
      password: 'jojo2',
      confirm: '',
      code: '4396',
    }
  : {
      username: '',
      password: '',
      confirm: '',
      code: '',
    }

const getRandomCode = () => {
  return import.meta.env.DEV
    ? '4396'
    : Math.floor(Math.random() * 9000 + 1000) + ''
}

export function useLogin() {
  const isLogin = ref(true) // true = 登录 | false = 注册
  const user = useUserStore()
  const router = useRouter()
  const route = router.currentRoute.value
  const code = getRandomCode()
  const loginForm = reactive(loginFormObj)
  const loginRules = {
    username: [{ required: true, message: '用户名不能为空' }],
    password: [{ required: true, message: '密码不能为空' }],
    confirm: [
      {
        validator: (rule, value, cb) => {
          if (!value) {
            cb(new Error('请再次输入密码'))
          } else if (value !== loginForm.password) {
            cb(new Error('两次密码不一致'))
          } else {
            cb()
          }
        }, // 表单验证规则 https://github.com/yiminghe/async-validator
        trigger: 'blur',
      },
    ],
    code: [
      {
        validator: (rule, value, cb) => {
          if (!value) {
            cb(new Error('请输入验证码'))
          } else if (value !== code) {
            cb(new Error('验证码不一致'))
          } else {
            cb()
          }
        },
        trigger: 'blur',
      },
    ],
  }
  // 表单验证通过时，调用store中的登录方法
  const loginPassed = () => {
    const method = isLogin.value ? 'login' : 'signup'
    const successText = isLogin.value
      ? '登录成功,欢迎回来🎉 '
      : '注册成功，欢迎🎉🎉 '
    const errorText = isLogin.value ? '登录失败 ' : '注册失败 '

    return user[method](toRaw(loginForm)).then(
      (data) => {
        router.push({
          path: route.query.redirect || '/',
          query: getParams(route.query.redirect) || {},
        })
        ElNotification({
          type: 'success',
          offset: 80,
          message: successText + data.nickname,
        })
      },
      (reason) => {
        console.log(reason)
        ElNotification({
          type: 'error',
          offset: 80,
          message: errorText + reason,
        })
      }
    )
  }

  return { isLogin, loginForm, loginRules, code, loginPassed }
}
