<template>
  <div class="input-avatar">
    <div @click="fileInput.click" class="avatar-uploader">
      <img :src="user.avatar" v-default-img="user.nickname" alt="avatar" />
      <div class="click-cover">
        <app-icon icon="el-icon-plus" />
        <div>点击头像修改</div>
      </div>
    </div>
    <input
      style="display: none"
      type="file"
      ref="fileInput"
      @change="setImage"
      accept="image/*"
    />
    <div class="title">我的头像</div>
    <div class="description">支持 jpg、png、jpeg 格式大小 5M 以内的图片</div>
  </div>
  <el-dialog v-model="dialogVisible" title="裁剪头像" width="30%">
    <div style="width: 400px; height: 400px; margin: auto">
      <vueCropper
        :auto-crop-width="200"
        :auto-crop-height="200"
        :img="imgData"
        ref="cropper"
        centerBox
        autoCrop
        infoTrue
        fixed
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button round @click="dialogVisible = false">关&nbsp;闭</el-button>
        <el-button @click="getImage" round type="primary">确&nbsp;认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import 'vue-cropper/next/dist/index.css'
import { VueCropper } from 'vue-cropper/next'
import { uploadAvatar } from '/src/api/user'
import { useUserStore } from '/src/store/user'
import { ElNotification } from 'element-plus'

const user = useUserStore()
const dialogVisible = ref(false)
const fileInput = ref(null)
const cropper = ref(null)
const imgData = ref(null)

// 从图片中截图后发送请求
const getImage = () => {
  cropper.value.getCropBlob((data) => {
    uploadAvatar(data)
      .then((res) => {
        ElNotification({ type: 'success', message: res.msg })
        user.saveUserInfo({ avatar: res.data })
      })
      .finally(() => (dialogVisible.value = false))
  })
}

// input选择图片后的回调函数
const setImage = () => {
  const file = fileInput.value.files[0]
  if (!file || file.type.indexOf('image/') === -1) {
    return alert('请选择图片文件!!!')
  }
  const reader = new FileReader()
  reader.onload = (event) => {
    imgData.value = event.target.result
    dialogVisible.value = true
  }
  reader.readAsDataURL(file)
}
</script>

<style lang="scss" scoped>
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
