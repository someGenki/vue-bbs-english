<template>
  <div class="userArticle-view">
    <div v-if="list" class="search-area">
      <search-card v-for="item in list" :data="item">
        <template #ops>
          <el-popconfirm @confirm="handleDel(item.id)" title="真的假的啊？">
            <template #reference>
              <span class="userpost-btn"> 删除 </span>
            </template>
          </el-popconfirm>
          <span @click="handleEdit(item.id)" class="userpost-btn">编辑</span>
        </template>
      </search-card>
      <el-empty v-if="list.length === 0" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useUserStore } from '/src/store/user'
import SearchCard from '/src/components/SearchCard/index.vue'
import { delArticle, getUserArticle } from '../../api/article'

const user = useUserStore()
const router = useRouter()
const list = ref(null)
const handleDel = (aid) => {
  delArticle(aid).then((res) => {
    const index = list.value.findIndex((v) => v.id === aid)
    list.value.splice(index, 1)
    ElNotification({ type: 'success', message: res.msg })
  })
}
const handleEdit = (aid) => {
  router.push('/editor?type=article&id=' + aid)
}
if (user.hadLogin) {
  getUserArticle(user.uid).then((res) => (list.value = res.data))
}
</script>

<style lang="scss" scoped>
.userArticle-view {
  height: 85%;
  overflow-y: auto;
}

.search-card:hover .userpost-btn {
  color: #1e80ff;
  visibility: visible;
}

.userpost-btn {
  margin: 6px;
  font-size: 14px;
  cursor: pointer;
  visibility: hidden;
}
</style>
