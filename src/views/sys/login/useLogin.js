import { reactive, toRaw } from 'vue'
import { useUserStore } from '/src/store/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

// 获取路径中的查询参数并存入对象中
const getParams = (fullPath) => {
  let index
  if (fullPath && (index = fullPath.indexOf('?')) > -1) {
    const usp = new URLSearchParams(fullPath.substring(index))
    return Object.fromEntries(usp.entries())
  }
}

export function useSignUp() {}

export function useLogin() {
  const user = useUserStore()
  const router = useRouter()
  const route = router.currentRoute.value
  const loginFormData = reactive({
    username: 'jojo2',
    password: 'jojo2',
    code: '4396',
  })
  // 表单验证规则 https://github.com/yiminghe/async-validator
  const loginRules = {
    username: [{ required: true, message: '用户名不能为空' }],
    password: [{ required: true, message: '密码不能为空' }],
  }
  // 表单验证通过时，调用store中的登录方法
  const loginPassed = () => {
    return user.login(toRaw(loginFormData)).then(
      (data) => {
        router.push({
          path: route.query.redirect || '/',
          query: getParams(route.query.redirect) || {},
        })
        ElMessage({
          type: 'success',
          message: '登录成功,欢迎回来:🎉' + data.nickname,
        })
      },
      (reason) => {
        ElMessage({
          type: 'error',
          message: '登录失败，' + reason,
        })
      }
    )
  }
  return { loginFormData, loginRules, loginPassed }
}
