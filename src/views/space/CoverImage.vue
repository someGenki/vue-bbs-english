<template>
  <!-- 背景图 -->
  <div class="user-cover">
    <template v-if="canUpload">
      <img :src="img" v-default-img.background />
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
          :can-move-box="false"
          :img="imgData"
          ref="cropper"
          autoCrop
          fixedBox
          original
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
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { VueCropper } from 'vue-cropper/next'
import 'vue-cropper/next/dist/index.css'
import { ElNotification } from 'element-plus'
import { uploadImage } from '../../api/file'
import { updateInfos } from '../../api/user'

const props = defineProps({ img: { type: String } })
const router = useRouter()
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
.user-cover {
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
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-size: 14px;
    line-height: 32px;
    color: hsla(0, 0%, 100%, 0.7);
    text-align: center;
    cursor: pointer;
    background: none;
    border: 1px solid;
    border-radius: 4px;

    span {
      margin-left: 4px;
    }

    &:hover {
      background: hsla(0, 0%, 100%, 0.06);
    }
  }
}
</style>
