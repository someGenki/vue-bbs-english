<template>
  <router-link :to="`/article/${data.id}`" class="read-card">
    <img class="first-pic" :src="data.firstPic" alt="" />
    <div class="card-introduce">
      <h3 class="title">{{ data.title }}</h3>
      <div class="description">{{ data.description }}</div>
      <div class="infos">
        <span class="difficulty" :style="{ color }">
          {{ difficultyText }}
        </span>
        <span class="time">{{ data.gmtCreate }}</span>
        <span class="view"><i />{{ data.pv }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // [id, firstPic, title, description, difficulty, pv, gmtCreate]
  data: { type: Object, required: true },
})

const color = computed(() => {
  switch (props.data.difficulty) {
    case 1:
      return '#06D6A0'
    case 2:
      return '#FFD166'
    case 3:
      return '#FF6F59'
    case 4:
      return '#26547C'
  }
})

const difficultyText = computed(() => {
  switch (props.data.difficulty) {
    case 1:
      return '小学水平'
    case 2:
      return '中学水平'
    case 3:
      return '大学水平'
    case 4:
      return '商务水平'
  }
})
</script>

<style lang="scss" scoped>
.read-card {
  display: block;
  color: #6d757d;
  height: 170px;
  cursor: pointer;
  border-radius: 4px;
  padding: 10px;
  background-color: #ffffff;
  transition: transform 200ms;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 12px 12px 20px rgba(0, 0, 0, 0.05);
  }
}

.first-pic {
  float: left;
  margin-right: 12px;
  width: 200px;
  height: 150px;
  border-radius: 6px;
}

.card-introduce {
  display: flex;
  flex-direction: column;
  padding-left: 6px;
  height: 145px;

  & > .title {
    color: #222222;
    margin-top: 2px;
  }

  & > .description {
    color: #6d757d;
    flex: 1;
  }

  & > .infos {
    & > * {
      margin-right: 12px;
    }

    .difficulty {
      font-weight: bold;
    }

    .view {
      display: inline-flex;
      align-items: center;
      float: right;
      margin-right: 28px;

      & > i {
        height: 14px;
        width: 14px;
        margin-right: 4px;
        background-size: 100%;
        background-image: url('/src/icons/view.png');
      }
    }
  }
}
</style>
