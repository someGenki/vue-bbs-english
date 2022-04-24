<template>
  <div class="bbs-login">
    <div class="login-container">
      <div class="login-left">
        <!-- <div title="未设计" class="login-logo"></div>-->
        <img width="450" src="/src/assets/images/year2022.svg" alt="" />
      </div>
      <div class="login-right">
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginFormRef"
          class="login-form"
          @keydown.enter="handleLogin"
          :class="isLogin ? 'login' : 'signup'"
        >
          <div @click="isLogin = !isLogin" class="login-title">
            <span class="login-text">登录</span>
            <span style="margin: 8px">|</span>
            <span class="signup-text">注册</span>
          </div>

          <p class="agreement">
            登录或注册即代表你同意<a>用户协议</a>和<a>隐私政策</a>
          </p>

          <el-form-item prop="username">
            <el-input
              required
              name="username"
              class="login-input"
              prefix-icon="el-icon-user"
              v-model="loginForm.username"
              placeholder="用户名"
            />
          </el-form-item>

          <el-form-item required prop="password">
            <el-input
              required
              name="password"
              class="login-input"
              show-password
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <transition name="from-left">
            <el-form-item v-if="!isLogin" required prop="confirm">
              <el-input
                required
                name="confirm"
                class="login-input"
                show-password
                prefix-icon="el-icon-select"
                v-model="loginForm.confirm"
                placeholder="请确认密码"
              />
            </el-form-item>
          </transition>
          <el-form-item prop="code" class="form-captcha">
            <el-input
              placeholder="验证码"
              name="code"
              prefix-icon="el-icon-picture-filled"
              class="login-input"
              style="width: 60%; height: 44px; margin-right: 10px"
              type="text"
              v-model="loginForm.code"
            />
            <img
              style="width: 120px; height: 42px"
              :src="captchaSrc"
              alt="验证码"
              title="验证码"
            />
          </el-form-item>

          <el-button
            @click.prevent="handleLogin"
            :loading="loading"
            class="login-btn"
            type="primary"
            size="large"
            >{{ isLogin ? '登录' : '注册' }}
          </el-button>
        </el-form>
      </div>
      <div class="login-footer">Powered by 禾几元</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLogin } from './useLogin'

const loading = ref(false)
const loginFormRef = ref(null)
const { isLogin, loginForm, loginRules, code, loginPassed } = useLogin()
const captchaSrc = `http://www.webxml.com.cn/WebServices/ValidateCodeWebService.asmx/cnValidateImage?byString=${code}`

const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      loginPassed().finally(() => (loading.value = false))
    }
  })
}
</script>

<style lang="scss" scoped>
$bg-input: #f1f2f3; // 输入框背景颜色
$sm-width: 768px; // 小屏幕平板尺寸
$input-height: 44px;

.bbs-login {
  position: relative;
  height: calc(100vh - 7rem);
  overflow: hidden;
}

.login-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
}

.login-left {
  width: 25%;
  min-width: 300px;
  max-width: 500px;
  height: 500px;
  user-select: none;
  background-size: 100%;

  .login-logo {
    font-size: 60px;
    letter-spacing: 12px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.login-right {
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 500px;

  :deep(.form-captcha .el-form-item__content) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }
}

// 表单主体样式！
.login-form {
  position: relative;
  align-self: flex-start;
  width: 450px;
  padding: 1rem 2rem 2rem;
  overflow: hidden;
  background: white;
  border-radius: 1rem;
  box-shadow: 4px 10px 16px rgb(36 37 38 / 13%);
  transition: all 250ms ease-out;
  // 登录注册切换
  & > .login-title {
    display: inline-block;
    height: 32px;
    color: #999;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;

    > span {
      transition: font-size 300ms ease-out;
    }
  }

  // 同意协议声明
  & > .agreement {
    font-size: 14px;
    color: #999;

    & > a {
      color: #00a1d6;
      cursor: pointer;
    }
  }

  // 输入框样式
  .login-input {
    height: $input-height;
    font-size: 16px;
    line-height: $input-height;
    --el-input-bg-color: #f8f5f5;
  }

  // 登录按钮 使用绝对定位让动画效果正常点
  .login-btn {
    position: absolute;
    bottom: 2rem;
    width: 386px;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 16px;
  }

  &.login {
    height: 360px;

    .login-text {
      font-size: 24px;
      color: #2b2b2b;
    }
  }

  &.signup {
    height: 425px;

    .signup-text {
      font-size: 24px;
      color: #2b2b2b;
    }
  }
}

// 无关紧要的底部
.login-footer {
  position: absolute;
  bottom: 10px;
  font-size: 6px;
  color: transparent;
  user-select: none;
  background: linear-gradient(to left, #0250c5 0%, #d43f8d 100%);
  -webkit-background-clip: text;
}

// 切换到注册表单时，确认密码框的动态效果  难点
// from是初始帧的样式(随后就被移除)
.from-left-enter-from {
  height: 0;
  opacity: 0;
  transform: translateX(-50%);
}

// active是动画生效周期,当from被移除后，动画效果生效
.from-left-enter-active {
  transition: all 0.3s ease-out;
}

/*
@media screen and (max-width: $sm-width) {
  .login-left {
    display: none;
  }
  .login-right {
    align-self: flex-start;
    justify-content: center;
    width: 100%;
  }
  .login-form {
    padding-right: 1rem;
    padding-left: 1rem;
  }
}*/
</style>
