<template>
  <div class="profile">
    <el-form :model="form" label-position="left" label-width="70px">
      <div class="divide"></div>
      <el-form-item label="学校" prop="school">
        <el-input v-model="form.school" maxlength="32" show-word-limit />
      </el-form-item>
      <div class="divide"></div>
      <el-form-item label="专业" prop="profession">
        <el-input v-model="form.profession" maxlength="32" show-word-limit />
      </el-form-item>
      <div class="divide"></div>
      <el-form-item label="QQ号" prop="school">
        <el-input v-model="form.qqnum" maxlength="11" show-word-limit />
      </el-form-item>
      <div class="divide"></div>
      <el-form-item label="性别" prop="sex">
        <div class="sex-wrapper">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男👴</el-radio>
            <el-radio :label="2">女👵</el-radio>
            <el-radio :label="3">未指定</el-radio>
          </el-radio-group>
        </div>
      </el-form-item>
      <div class="divide"></div>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          v-model="form.birthday"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="你选的嘛"
        />
      </el-form-item>
      <div class="divide"></div>
      <el-form-item label="个人签名" prop="sign">
        <el-input
          v-model="form.sign"
          type="textarea"
          maxlength="64"
          :autosize="{ minRows: 4, maxRows: 6 }"
          show-word-limit
        />
      </el-form-item>
      <div class="divide"></div>
      <el-form-item>
        <el-button @click="handleSave" class="btn-save" type="primary">
          保存修改
        </el-button>
      </el-form-item>
    </el-form>
    <input-avatar />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useUserStore } from '/src/store/user'
import { getUserInfo, updateInfos } from '/src/api/user'
import InputAvatar from './InputAvatar.vue'

const router = useRouter()
const user = useUserStore()

!user.hadLogin && router.replace('/login')

const form = reactive({
  school: '',
  qqnum: '',
  profession: '',
  sign: '',
  birthday: '',
  sex: 3,
})

getUserInfo(user.uid).then(({ data }) => {
  Object.keys(form).forEach((key) => {
    form[key] = data[key]
  })
})

const handleSave = () => {
  updateInfos(form).then((res) => {
    ElNotification(res.msg)
    router.refresh()
  })
}
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
      padding-left: 4px;
      border-radius: 4px;
    }

    .btn-save {
      height: 36px;
      padding: 7px 20px;
      margin-top: 24px;
      color: white;
      background-color: #1d7dfa;
      border: none;

      &:hover {
        background-color: rgba(30, 128, 255, 0.16);
      }
    }
  }
}
</style>
