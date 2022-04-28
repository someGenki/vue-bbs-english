<template>
  <div class="user-space-header">
    <!-- 背景图 -->
    <div class="user-cover">
      <template v-if="canUpload">
        <img :src="userinfo.coverImg" v-default-img.background />
        <div class="upload-btn" @click="fileInput.click">
          <input
            style="display: none"
            type="file"
            ref="fileInput"
            @change="setImage"
            accept="image/*"
          />
          <app-icon icon="el-icon-camera" />
          <span>编辑封面图片</span>
        </div>
      </template>

      <template v-else>
        <div style="width: 100%; height: 100%; margin: auto">
          <vueCropper
            auto-crop-width="1000"
            auto-crop-height="250"
            :img="imgData"
            ref="cropper"
            autoCrop
            fixedBox
            original
            :can-move-box="false"
            :can-scale="false"
          />
        </div>

        <div style="position: absolute; right: 10px; bottom: -42px">
          <el-button @click="getImage" round type="primary">
            确&nbsp;认
          </el-button>
          <el-button round @click="canUpload = true">取&nbsp;消</el-button>
        </div>
      </template>
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
import { VueCropper } from 'vue-cropper/next'
import 'vue-cropper/next/dist/index.css'
import { ref } from 'vue'
import { updateInfos } from '../../api/user'
import { ElNotification } from 'element-plus'
import { uploadImage } from '../../api/file'
import { useRouter } from 'vue-router'

const router = useRouter()
const { userinfo } = defineProps({
  userinfo: { type: Object, required: true },
})
const iconName = `el-icon-${userinfo.value === 1 ? 'male' : 'female'}`
const iconColor = userinfo.value === 1 ? '#40a9ff' : '#ff7474'

const canUpload = ref(true)
const fileInput = ref(null)
const cropper = ref(null)
const imgData = ref(null)
const setImage = () => {
  canUpload.value = false
  const file = fileInput.value.files[0]
  fileInput.value.value = ''
  imgData.value = ''
  if (!file || file.type.indexOf('image/') === -1) {
    return alert('请选择图片文件!!!')
  }
  const reader = new FileReader()
  reader.onload = (event) => {
    imgData.value = event.target.result
  }
  reader.readAsDataURL(file)
}
const getImage = () => {
  cropper.value.getCropBlob(async (data) => {
    const { data: url } = await uploadImage(data)
    const res = await updateInfos({ coverImg: url })
    ElNotification(res.msg)
    canUpload.value = true
    router.refresh()
  })
}
</script>

<style lang="scss" scoped>
.user-space-header {
  height: 340px;
  margin-bottom: 16px;
  overflow: hidden;
  background: #ffffff;

  & > .user-cover {
    position: relative;
    height: 250px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

    & > img {
      width: 100%;
      max-height: 250px;
    }

    .upload-btn {
      position: absolute;
      top: 24px;
      right: 24px;
      z-index: 2;
      color: hsla(0, 0%, 100%, 0.7);
      padding: 0 16px;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      background: none;
      border: 1px solid;
      border-radius: 4px;
      display: flex;
      align-items: center;
      span {
        margin-left: 4px;
      }
      &:hover {
        background: hsla(0, 0%, 100%, 0.06);
      }
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
