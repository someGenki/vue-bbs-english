<template>
  <div class="post-option">
    <div class="category">
      <span class="desc">帖子分类:</span>
      <el-radio-group v-model="form.category" size="large">
        <el-radio v-for="i in postCategory" :label="i.value">
          {{ i.name }}
        </el-radio>
      </el-radio-group>
    </div>
    <div class="attachment">
      <p class="desc">上传附件:</p>
      <el-upload
        drag
        :limit="1"
        :headers="{ token: getToken() }"
        :action="reqUrl"
        :on-remove="() => (form.attachment = '')"
        :on-success="success"
      >
        <app-icon size="64" icon="el-icon-upload-filled" />
        <div class="el-upload__text">
          将文件拖拽到此处或 <em>点击选择</em>
        </div>
        <template #tip>
          <div class="el-upload__tip"> 文件大小不建议查过10240Kb</div>
        </template>
      </el-upload>
    </div>
    <div class="checkbox">
      <el-checkbox
        v-model="form.acAgreement"
        label="我已阅读并接受《网络社区规范》"
      />
      <el-checkbox
        v-model="form.acAgreement"
        label="我已阅读并接受《内容创造保护》"
      />
    </div>
  </div>
</template>

<script setup>
import { getToken } from '/src/utils/storage'
import { BASEURL } from '/src/utils/request'
import { postCategory } from '/src/hooks/content/usePost'

const props = defineProps({
  form: { type: Object, required: true },
  success: { type: Function, required: true },
  reqUrl: { type: String, default: BASEURL + '/file/upload' },
})
</script>

<style lang="scss" scoped>
.post-option {
  padding: 16px 0 16px 32px;

  .category {
    margin-bottom: 16px;
  }

  .desc {
    display: inline-block;
    width: 100px;
  }

  .attachment {
    display: flex;

    :deep(.el-upload-dragger) {
      height: 120px;
    }

    :deep(.el-upload-list__item-name) {
      max-width: 300px;
    }

    .el-upload .app-icon {
      margin-top: 20px;
    }
  }

  .checkbox {
    display: flex;
    flex-direction: column;
  }

  .button-group {
    margin-top: 16px;
  }
}
</style>
