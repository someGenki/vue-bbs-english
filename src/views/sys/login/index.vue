<template>
  <div class="bbs-login">
    <div class="login-container">
      <div class="login-left">
        <!-- <div title="未设计" class="login-logo"></div>-->
        <img width="450" src="/src/assets/images/year2022.svg" alt="" />
      </div>
      <div class="login-right">
        <el-form
          :model="loginFormData"
          :rules="loginRules"
          ref="loginFormRef"
          class="login-form"
        >
          <h1 style="margin-left: 4px; text-align: left">登录</h1>

          <p class="agreement">
            登录或注册即代表你同意<a href="">用户协议</a>和<a href=""
              >隐私政策
            </a>
          </p>

          <el-form-item required prop="username">
            <el-input
              required
              name="username"
              class="login-input"
              prefix-icon="el-icon-user"
              v-model="loginFormData.username"
              placeholder="用户名/邮箱"
            />
          </el-form-item>

          <el-form-item required prop="password">
            <el-input
              required
              name="password"
              class="login-input"
              show-password
              prefix-icon="el-icon-lock"
              v-model="loginFormData.password"
              placeholder="请输入密码"
            />
          </el-form-item>

          <el-form-item class="form-captcha">
            <el-input
              placeholder="验证码"
              name="code"
              prefix-icon="el-icon-picture-filled"
              class="login-input"
              style="width: 60%; height: 44px; margin-right: 10px"
              type="text"
              v-model="loginFormData.code"
            />
            <img
              style="width: 120px; height: 42px"
              src="http://www.webxml.com.cn/WebServices/ValidateCodeWebService.asmx/cnValidateImage?byString=4396"
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
            >登录
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

const { loginFormData, loginRules, loginPassed } = useLogin()

const loading = ref(false)
const loginFormRef = ref(null)

// 登录按钮触发的函数
const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      loginPassed().finally(() => (loading.value = false))
    }
  })
}
// TODO 注册时多一条 确认密码输入框 把按钮的文改了就行
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
  background-size: 100%;
  user-select: none;
  //background-image: url('https://mixkit.imgix.net/art/preview/mixkit-i-love-you-hand-gesture-419-original-large.png?q=80&auto=format%2Ccompress');
  .login-logo {
    font-size: 60px;
    letter-spacing: 12px;
    background-image: v-bind('randomBg');
    /* stylelint-disable-next-line */
    //filter: invert(100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.login-right {
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 500px;

  & > .login-form {
    align-self: center;
    width: 450px;
    padding: 0 2rem 3rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 4px 10px 16px rgb(36 37 38 / 13%);

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
      font-size: 18px;
      line-height: $input-height;
      --el-input-bg-color: #f8f5f5;
    }

    .login-btn {
      width: 100%;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 16px;
    }
  }

  :deep(.form-captcha .el-form-item__content) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 22px;
  }
}

.login-footer {
  position: absolute;
  bottom: 10px;
  font-size: 6px;
  color: transparent;
  user-select: none;
  background: linear-gradient(to left, #0250c5 0%, #d43f8d 100%);
  -webkit-background-clip: text;
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
