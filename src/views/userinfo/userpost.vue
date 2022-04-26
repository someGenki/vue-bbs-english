<template>
  <div class="userpost-view">
    <div v-if="list" class="search-area">
      <search-card v-for="item in list" :data="item">
        <template #ops>
          <el-popconfirm @confirm="handleDel(item.id)" title="真的假的啊？">
            <template #reference>
              <span class="userpost-del">删除</span>
            </template>
          </el-popconfirm>
        </template>
      </search-card>
      <el-empty v-if="list.length === 0" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { delPost, getUserPost } from '../../api/post'
import { useUserStore } from '../../store/user'
import SearchCard from '/src/components/SearchCard/index.vue'
import { ElNotification } from 'element-plus'

const user = useUserStore()
const list = ref(null)
const handleDel = (pid) => {
  delPost(pid).then((res) => {
    const index = list.value.findIndex((v) => v.id === pid)
    list.value.splice(index, 1)
    ElNotification({ type: 'success', message: res.msg })
  })
}
if (user.hadLogin) {
  getUserPost(user.uid).then((res) => (list.value = res.data))
}
</script>

<style lang="scss" scoped>
.userpost-view {
  height: 85%;
  overflow-y: auto;
}

.search-card:hover .userpost-del {
  color: #1e80ff;
  visibility: visible;
}

.userpost-del {
  font-size: 14px;
  cursor: pointer;
  visibility: hidden;
}
</style>
