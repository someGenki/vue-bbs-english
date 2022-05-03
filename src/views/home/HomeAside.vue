<template>
  <div class="home-aside">
    <div class="aside-sign-in">
      <div class="card-title">
        <div>
          <app-icon icon="el-icon-calendar" color="#DD6207" size="24" />
          <span class="greeting-text">{{ greeting }}</span>
        </div>
        <button v-if="noSignin" @click="handleSignin" class="sign-in-btn">
          签到一下
        </button>
        <button v-else class="sign-in-btn">已签到</button>
      </div>
      <p class="card-text">点亮你在这儿的每一天✨</p>
    </div>
    <!-- 海报图 -->
    <div class="poster">
      <img
        src="/src/assets/images/pic01.jpg"
        style="width: 100%; height: 180px"
        alt="pic01"
      />
      <a href="https://github.com/someGenki" target="_blank" class="attach-tag">
        推广
      </a>
    </div>
    <!-- 海报图 -->
    <div class="poster">
      <img
        src="/src/assets/images/pic02.jpg"
        style="width: 100%; height: 250px"
        alt="pic02"
      />
      <a
        href="http://www.waterconserving.cn/"
        class="attach-tag attach-tag--light"
        target="_blank"
      >
        公益
      </a>
    </div>
    <!-- 仓库二维码 -->
    <a target="_blank" href="https://github.com/someGenki" class="newest-info">
      <img src="/src/assets/images/qrcode01.jpg" alt="qrcode" />
      <div>
        <p style="font-size: 15px; color: #1d2130">获取站点最新动态</p>
        <p style="margin-top: 12px; font-size: 12px; color: #5c5c5c">
          这其实是个人github链接
        </p>
      </div>
    </a>
    <!-- 活跃用户 -->
    <div class="active-user">
      <div class="active-user-title">🔥活跃用户</div>
      <div v-if="topUser">
        <active-user-card v-for="u in topUser" :data="u" />
      </div>
    </div>
    <!-- 导航集合 -->
    <nav-set />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getTopUser } from '../../api/search'
import { useUserStore } from '../../store/user'
import { useSignin } from './useSignin'
import NavSet from './NavSet.vue'
import ActiveUserCard from '/src/components/UserCard/index.vue'

function getGreeting(hour = new Date().getHours()) {
  if (hour < 6) return '凌晨'
  if (hour < 9) return '早上'
  if (hour < 12) return '上午'
  if (hour < 14) return '中午'
  if (hour < 17) return '下午'
  if (hour < 19) return '傍晚'
  if (hour < 22) return '晚上'
  else return '夜里'
}

const user = useUserStore()
const topUser = ref(null)
const { noSignin, handleSignin } = useSignin()
const greeting = ref(getGreeting() + '好!')

getTopUser().then((res) => (topUser.value = res.data.slice(0, 5)))
</script>

<style lang="scss" scoped>
@import '/src/styles/variables';

.home-aside {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 17rem;

  // 规定右侧每个卡片的基本外形
  > div {
    position: relative;
    margin-top: 12px;
    background-color: #ffffff;
  }

  // 签到组件
  > .aside-sign-in {
    height: 100px;
    padding: 12px;
    margin-top: 0;

    .card-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .card-text {
      margin-top: 12px;
      font-size: 14px;
      color: $deep-gray;
      text-align: center;
    }

    .greeting-text {
      margin-left: 12px;
      font-size: 18px;
      font-weight: bold;
      color: $title-text-color;
      vertical-align: top;
    }

    .sign-in-btn {
      height: 32px;
      padding: 4px 12px;
      font-size: 14px;
      color: $deep-blue;
      cursor: pointer;
      background-color: #ffffff;
      border: $blue-btn-border;
      border-radius: 16px;

      &:hover {
        background-color: #e8f8ff;
      }
    }
  }

  // 宣传海报
  > .poster {
    .attach-tag {
      position: absolute;
      right: 12px;
      bottom: 10px;
      padding: 2px 6px;
      font-size: 12px;
      color: #d7d7d7;
      cursor: pointer;
      background-color: rgba(232, 220, 220, 0.2);
      border-radius: 2px;
    }

    // 用于背景色太亮时候的样式
    .attach-tag--light {
      color: #fff;
      background-color: rgb(89 89 89 / 75%);
    }
  }

  // 最新动态组件 (带二维码的)
  > .newest-info {
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-top: 12px;
    background-color: #ffffff;

    > img {
      height: 60px;
      margin-right: 16px;
    }
  }

  // 活跃用户组件
  > .active-user {
    .active-user-title {
      padding: 8px 12px;
      font-size: 14px;
      border-bottom: 1px solid #e5e5e5;
    }
  }
}
</style>
