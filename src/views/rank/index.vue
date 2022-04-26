<template>
  <div class="rank-view">
    <div class="rank-area">
      <div class="rank-head">
        <switch-tabs
          :left="chooseType"
          :right="chooseBy"
          :info="byList"
          :tabs="tabs"
          @left="handleSwitch"
          @right="handleChange"
        />
      </div>
      <div v-if="loaded" class="rank-list">
        <!--user card 待设计，同样穿个data-->
        <template v-if="chooseType === 'post'">
          <post-card
            v-for="(item, index) in list"
            no-user
            :key="item.id"
            :data="item"
          >
            <div class="rank-val">
              {{ index + 1 }}
            </div>
          </post-card>
        </template>
        <template v-else>
          <user-card v-for="(item, index) in list" :data="item" :key="item.id">
            <div class="rank-val">
              {{ index + 1 }}
            </div>
          </user-card>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { getRank } from '/src/api/search'
import SwitchTabs from './SwitchTabs.vue'
import PostCard from '/src/components/PostCard/index.vue'
import UserCard from '/src/components/UserCard/index.vue'

const loaded = ref(false)
const list = ref(false)
const chooseType = ref('post')
const chooseBy = ref('pv')
// 用于标签栏的渲染数据
const tabs = { post: '文章', user: '用户' }
const byList = {
  user: { point: '积分点数' },
  post: {
    pv: '点击量',
    likes: '点赞数',
    comments: '评论数',
  },
}
const handleSwitch = (type) => {
  chooseType.value = type
  loaded.value = false
  // 获取第一个key作为更变后的默认值
  chooseBy.value = Object.keys(byList[chooseType.value])[0]
}
const handleChange = (by) => (chooseBy.value = by)

watchEffect(() => {
  // 每当 chooseBy chooseType变动时重新获取
  getRank(chooseBy.value, chooseType.value).then((res) => {
    list.value = res.data
    loaded.value = true
  })
})
</script>

<style lang="scss" scoped>
.rank-view {
  max-width: 1000px;
  margin: 0 auto;
}

.rank-area {
  max-width: 768px;
  min-height: 300px;
  background: #ffffff;
  .rank-head{
    border-bottom: 1px solid #e6e6e6;
  }
}

.post-card {
  margin: 0;
  border-top: 1px solid #e6e6e6;
  &:nth-child(1){
    border-top:none;
  }
  &:hover {
    box-shadow: none;
  }

  .rank-val {
    position: absolute;
    top: 12px;
    left: 0;
    width: 60px;
    height: 60px;
    padding: 18px;
    font-size: 18px;
    font-weight: bold;
    color: #949494;
    background-size: 100%;
  }
}

.user-card {
  margin: 16px;

  .rank-val {
    position: absolute;
    right: 32px;
    width: 48px;
    height: 48px;
    padding: 18px;
    font-size: 18px;
    font-weight: bold;
    color: #949494;
    background-size: 100%;
  }
}

.user-card:nth-child(1) .rank-val ,
.post-card:nth-child(1) .rank-val {
  color: transparent;
  background-image: url('/src/icons/medal-1.png');
}

.user-card:nth-child(2) .rank-val ,
.post-card:nth-child(2) .rank-val {
  color: transparent;
  background-image: url('/src/icons/medal-2.png');
}

.user-card:nth-child(3) .rank-val ,
.post-card:nth-child(3) .rank-val {
  color: transparent;
  background-image: url('/src/icons/medal-3.png');
}
</style>