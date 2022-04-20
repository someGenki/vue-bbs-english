<template>
  <!--待优化-->
  <el-tooltip
    :popper-class="emotionClass"
    effect="light"
    trigger="click"
    placement="bottom-start"
  >
    <div class="app-emotion">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
        />
        <path
          d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
        />
      </svg>
      <span>表情</span>
    </div>

    <template #content>
      <div class="emotion-title">{{ emotions[choose].name }}</div>
      <!--放置一堆表情的容器-->
      <el-scrollbar height="200px" view-class="emotion-wrapper">
        <a
          v-for="item in emotionList"
          v-html="item.html"
          @click="handleEmotionClick(item)"
          class="emotion-item"
          :key="item.text"
          :data-text="item.text"
        />
      </el-scrollbar>
      <!--底部切换标签栏-->
      <div class="emotion-tabs">
        <a
          v-for="tab in emotionTabs"
          v-html="tab.first"
          @click="choose = tab.key"
          :class="{ choose: choose === tab.key }"
        >
        </a>
      </div>
    </template>
  </el-tooltip>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useEmotion } from '/src/hooks/emotion/useEmotions'

const emit = defineEmits(['emotion'])
const { emotions, emotionTabs } = useEmotion()

const choose = ref('wx')

const emotionList = computed(() => {
  const emo = emotions[choose.value]
  const process = emo.process
  return emo.list.map(process)
})

const emotionClass = computed(() => {
  return 'emotion-box ' + choose.value
})

const handleEmotionClick = (arg) => {
  emit('emotion', arg.text)
}
</script>

<style lang="scss">
// 暴露出去的触发按钮
.app-emotion {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-right: 14px;
  font-size: 14px;
  color: #7f7f7f;
  cursor: pointer;

  & > svg {
    height: 14px;
    margin-top: 1px;
    margin-right: 2px;
  }

  &:hover {
    color: #1e80ff;
  }
}

// 弹出层卡片样式
.emotion-box {
  width: 360px;
  padding: 0;
  font-size: 14px;
  background-color: #ffffff;
  border: 1px solid #e3e4e5;
  border-radius: 8px;
  box-shadow: 0 12px 12px 0 #6e78824c;
  // 显示表情集合名
  > .emotion-title {
    margin: 10px 14px 4px;
    line-height: 16px;
    color: #5a646e;
    letter-spacing: 1.5px;
  }

  // 被el-scroll包裹 所以层次有变
  .emotion-wrapper {
    margin: 6px 0 6px 6px;
    overflow: auto;
    word-break: break-word;

    & .emotion-item {
      display: inline-block;
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background-color: #e3e5e7;
      }
    }
  }

  // 表情集合切换表情栏
  > .emotion-tabs {
    position: relative;
    height: 36px;
    overflow: hidden;
    background-color: #f1f2f3;
    border-radius: 0 0 4px 4px;

    > a {
      display: flex;
      align-items: center;
      justify-content: center;
      float: left;
      width: 54px;
      height: 100%;
      cursor: pointer;

      &:hover {
        background-color: #e3e4e5;
      }

      &.choose {
        background-color: #ffffff;
      }

      // 让第二个tab的emoji表情放大
      &:nth-child(2) {
        font-size: 20px;
      }
    }
  }
}

// 对于特定表情进行调整 [wx,emoji,颜文字]
.emotion-box.wx .emotion-item {
  margin: 4px;

  > img {
    width: 32px;
    height: 32px;
  }
}

.emotion-box.emoji .emotion-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  margin: 6px;
  font-size: 28px;
}

.emotion-box.kaomoji .emotion-item {
  width: auto;
  height: 28px;
  padding: 2px 4px;
  margin: 6px;
  font-size: 14px;
  line-height: 28px;
}
</style>
