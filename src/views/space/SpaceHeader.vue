<template>
  <div class="user-space-header">
    <cover-image :img="userinfo.coverImg" />
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
import CoverImage from './CoverImage.vue'

const { userinfo } = defineProps({ userinfo: { type: Object, required: true } })
const iconName = `el-icon-${userinfo.sex === 1 ? 'male' : 'female'}`
const iconColor = userinfo.sex === 1 ? '#40a9ff' : '#ff7474'
</script>

<style lang="scss" scoped>
.user-space-header {
  height: 340px;
  margin-bottom: 16px;
  overflow: hidden;
  background: #ffffff;

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
