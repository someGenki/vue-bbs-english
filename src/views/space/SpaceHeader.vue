<template>
  <div class="user-space-header">
    <!-- 背景图 -->
    <div class="user-cover">
      <img :src="userinfo.coverImg" v-default-img.background />
    </div>
    <div class="user-info">
      <img
        class="user-avatar"
        :src="userinfo.avatar"
        v-default-img="userinfo.nickname"
      />
      <div class="detail">
        <div>
          <span class="user-nickname">
            {{ userinfo.nickname }}
          </span>
          <span class="sex" v-if="userinfo.sex < 3">
            <app-icon size="20" :icon="iconName" :color="iconColor" />
          </span>
          <span class="point">{{ null }}</span>
        </div>
        <div class="user-sign">
          <app-icon icon="el-icon-mic" />
          {{ userinfo.sign }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO 推文发表 查看
const { userinfo } = defineProps({
  userinfo: { type: Object, required: true },
})
const iconName = `el-icon-${userinfo.value === 1 ? 'male' : 'female'}`
const iconColor = userinfo.value === 1 ? '#40a9ff' : '#ff7474'
</script>

<style lang="scss" scoped>
.user-space-header {
  height: 340px;
  overflow: hidden;
  background: #ffffff;
  margin-bottom: 16px;

  & > .user-cover {
    position: relative;
    max-height: 250px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

    & > img {
      width: 100%;
      max-height: 250px;
    }
  }

  & > .user-info {
    position: relative;

    > .user-avatar {
      position: absolute;
      top: -24px;
      left: 10px;
      height: 100px;
      border: 3px solid #ebe0e0;
      border-radius: 8px;
    }

    > .detail {
      position: absolute;
      top: 5px;
      left: 125px;

      .user-nickname {
        margin-right: 12px;
        font-size: 26px;
        font-weight: bold;
      }

      .user-sign {
        display: flex;
        align-items: center;
        margin-top: 12px;
      }
    }
  }
}
</style>
