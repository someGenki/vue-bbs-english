<template>
  <div class="profile">
    <el-form
      :model="form"
      :rulues="rules"
      label-position="left"
      label-width="70px"
    >
      <div class="divide"></div>
      <el-form-item label="学校" prop="school">
        <el-input v-model="form.school" maxlength="50" show-word-limit />
      </el-form-item>

      <div class="divide"></div>
      <el-form-item label="专业" prop="profession">
        <el-input v-model="form.profession" maxlength="50" show-word-limit />
      </el-form-item>

      <div class="divide"></div>
      <el-form-item label="性别" prop="sex">
        <div class="sex-wrapper">
          <el-radio-group v-model="form.sex">
            <el-radio label="male" />
            <el-radio label="female" />
            <el-radio label="unset" />
          </el-radio-group>
        </div>
      </el-form-item>

      <div class="divide"></div>
      <el-form-item label="个人介绍" prop="sign">
        <el-input
          v-model="form.sign"
          type="textarea"
          maxlength="100"
          :autosize="{ minRows: 6, maxRows: 6 }"
          show-word-limit
        />
      </el-form-item>

      <div class="divide"></div>
      <el-form-item>
        <el-button class="btn-save" type="primary">保存修改</el-button>
      </el-form-item>
    </el-form>

    <div class="input-avatar">
      <div class="avatar-uploader">
        <img
          src="https://p6-passport.byteacctimg.com/img/user-avatar/a4813d8e94905b25909750f9a8d687a5~300x300.image"
          alt=""
        />
        <div class="click-cover">
          <app-icon icon="el-icon-plus" />
          <div>点击头像修改</div>
        </div>
      </div>
      <div class="title">我的头像</div>
      <div class="description">支持 jpg、png、jpeg 格式大小 5M 以内的图片</div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  school: '',
  profession: '',
  sign: '',
  sex: 0,
})
const rules = {}
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
}
.el-form {
  width: 560px;
  .el-form-item {
    padding: 0 10px;

    .sex-wrapper {
      width: 100%;
      padding-left: 10px;
      background-color: #fafafa;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
    }
    .btn-save {
      height: 36px;
      padding: 7px 20px;
      margin-top: 24px;
      color: white;
      background-color: #1d7dfa;
      border: none;
      border-radius: 0;
      &:hover {
        background-color: rgba(30, 128, 255, 0.16);
      }
    }
    :deep(.el-input__count-inner),
    :deep(.el-input__count) {
      background-color: transparent;
    }
    :deep(.el-input__inner),
    :deep(.el-textarea__inner) {
      background-color: #fafafa;
    }
  }
}

.input-avatar {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-items: center;
  width: 112px;
  margin-left: 74px;
  .avatar-uploader {
    position: relative;
    width: 90px;
    height: 90px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    &:hover {
      .click-cover {
        visibility: visible;
        background-color: rgba(29, 33, 41, 0.5);
      }
    }
    .click-cover {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
      visibility: hidden;
      border-radius: 50%;
    }
  }
  .title {
    margin-top: 10px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #1d2129;
  }
  .description {
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    color: #86909c;
  }
}
</style>
