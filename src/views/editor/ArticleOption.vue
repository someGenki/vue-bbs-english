<template>
  <div class="article-option">
    <div class="description">
      <span class="desc">文章描述:</span>
      <el-input
        class="article-desc"
        required
        minlength="4"
        maxlength="128"
        show-word-limit
        type="textarea"
        v-model="form.description"
      />
    </div>
    <div class="firstPic">
      <span class="desc">文章首图:</span>
      <el-upload
        :action="reqUrl"
        :headers="{ token: getToken() }"
        :limit="1"
        :show-file-list="false"
        :on-remove="() => (form.firstPic = '')"
        :on-success="success"
      >
        <img v-if="form.firstPic" :src="form.firstPic" class="upload-img" />
        <app-icon v-else class="upload-icon" size="42" icon="el-icon-plus" />
      </el-upload>
    </div>
    <div class="difficulty">
      <span class="desc">文章难度:</span>
      <el-radio-group v-model="form.difficulty">
        <el-radio v-for="(val, i) in difficultyLists" :label="i + 1">
          <el-tag :color="val[1]" effect="dark"> {{ val[0] }}</el-tag>
        </el-radio>
      </el-radio-group>
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
import { BASEURL } from '/src/utils/request'
import { getToken } from '/src/utils/storage'
import { difficultyLists } from '/src/hooks/content/useArticle'

const props = defineProps({
  form: { type: Object, required: true },
  success: { type: Function, required: true },
  reqUrl: { type: String, default: BASEURL + '/file/img' },
})
</script>

<style lang="scss" scoped>
.article-option {
  padding: 16px 0 16px 32px;

  .desc {
    display: inline-block;
    width: 80px;
  }

  & > .description {
    display: flex;
    align-items: flex-start;
  }

  & > .firstPic {
    display: flex;
    margin: 12px 0;

    .upload-img {
      height: 120px;
      object-fit: contain;
    }

    .upload-icon {
      margin: 12px 21px;
    }
  }

  & > .difficulty {
    .el-radio-group {
      margin-left: 16px;
    }

    .el-tag {
      border: none;
    }
  }

  & > .checkbox {
    display: flex;
    flex-direction: column;
  }
}

.article-desc {
  width: 100%;
  max-width: 768px;
  margin: 0 16px;
}
</style>
