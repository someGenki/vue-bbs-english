<template>
  <div class="user-info-card">
    <!--背景图-->
    <img
      :src="infos.coverImg"
      v-default-img.background
      class="user-cover-img"
    />
    <!--昵称+性别、个性签名、其他按钮-->
    <div class="main-info">
      <img
        :src="infos.avatar"
        v-default-img="infos.nickname"
        class="main-info-avatar"
        alt=""
      />
      <div class="main-info-nickname">
        {{ infos.nickname }}
        <app-icon
          v-if="infos.sex < 3"
          :icon="`el-icon-${infos.sex === 1 ? 'male' : 'female'}`"
          :color="infos.sex === 1 ? '#40a9ff' : '#ff7474'"
        />
      </div>
      <div class="main-info-sign">{{ infos.sign }}</div>
      <div class="main-info-btns">
        <el-button
          @click="$router.push('/space/' + infos.uid)"
          type="primary"
          size="small"
          >前往空间
        </el-button>
        <el-button size="small">发送消息</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  infos: { type: Object, required: true },
})
</script>

<style lang="scss" scoped>
@import '/src/styles/variables';
.user-info-card {
  min-height: 180px;

  .user-cover-img {
    display: block;
    width: 100%;
    height: 80px;
    object-fit: cover;
  }

  .main-info-avatar {
    float: left;
    width: 40px;
    height: 40px;
    margin: 0 8px;
    overflow: hidden;
    border-radius: 50%;
  }

  .main-info-nickname {
    display: flex;
    align-items: center;
    margin: 12px 16px 4px;
    font-size: 17px;
    color: $title-text-color;

    .app-icon {
      margin-left: 4px;
    }
  }

  .main-info-sign {
    font-size: 14px;
    color: $deep-gray;
  }

  .main-info-btns {
    display: flex;
    align-items: center;
    padding: 4px;
    margin-left: 50px;
  }
}
</style>
