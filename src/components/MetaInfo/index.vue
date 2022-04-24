<template>
  <div v-if="loaded" class="meta-info-box">
    <app-avatar size="40px" v-bind="info" />
    <div class="info-box">
      <div class="nickname">{{ info.nickname }}</div>
      <div class="meta-box">
        <span class="time">{{ article.gmtCreate }}</span>
        <span class="views">阅览次数&nbsp;{{ article.pv }}</span>
      </div>
      <div class="right-slot">
        <div
          @click="$emit('like')"
          :class="{ active: hadLike }"
          class="like-btn"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserInfoDigest as getInfo } from '/src/api/user'

const props = defineProps({
  article: { type: Object, required: true },
  hadLike: { type: Boolean, default: false },
})

const loaded = ref(false)
const info = ref(null)

getInfo(props.article.uid).then((res) => {
  loaded.value = true
  info.value = res.data
})
</script>

<style lang="scss" scoped>
@import '/src/styles/_variables';

.meta-info-box {
  min-height: 50px;
  padding: 4px;
  border-radius: 4px;
}

.meta-info-box > .info-box {
  position: relative;
  padding-left: 12px;
  overflow: hidden;

  > .nickname {
    line-height: 1.5;
    color: $name-text-color;
  }

  > .meta-box {
    margin-top: 2px;
    font-size: 14px;
    line-height: 22px;
    color: $mild-gray;

    & > .time::after {
      margin: 0 8px;
      color: $mild-gray;
      content: '·';
    }
  }

  > .right-slot {
    position: absolute;
    top: 0;
    right: 20px;

    & > .like-btn {
      width: 36px;
      height: 36px;
      cursor: pointer;
      background-image: url('/src/icons/like.png');
      background-size: 100%;
      transition: all 180ms ease-out;

      &:hover {
        animation: shake 300ms linear infinite alternate;
      }

      &.active {
        background-image: url('/src/icons/like-blue.png');
        animation: none;
      }
    }
  }
}

@keyframes shake {
  from {
    transform: rotate(-1deg);
    //transform-origin: 40% 40%;
  }
  to {
    transform: rotate(3deg) scale(1.03);
  }
}
</style>
