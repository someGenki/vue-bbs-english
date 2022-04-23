<template>
  <router-link target="_blank" :to="`/article/${data.id}`" class="read-card">
    <img class="first-pic" :src="data.firstPic" alt="" />
    <div class="card-introduce">
      <h3 class="title">{{ data.title }}</h3>
      <div class="description">{{ data.description }}</div>
      <div class="infos">
        <span class="difficulty" :style="{ color: difColor }">
          {{ difText }}
        </span>
        <span class="time">{{ data.gmtCreate }}</span>
        <span class="view"><i />{{ data.pv }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { getDifficulty } from '/src/hooks/content/useArticle'

const props = defineProps({
  // [id, firstPic, title, description, difficulty, pv, gmtCreate]
  data: { type: Object, required: true },
})
const { difColor, difText } = getDifficulty(props.data.difficulty)
</script>

<style lang="scss" scoped>
.read-card {
  display: block;
  height: 170px;
  padding: 10px;
  margin-bottom: 12px;
  color: #6d757d;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 4px;
  transition: transform 200ms;

  &:hover {
    box-shadow: 12px 12px 20px rgba(0, 0, 0, 0.05);
    transform: translateY(-3px);
  }
}

.first-pic {
  float: left;
  width: 200px;
  height: 150px;
  margin-right: 12px;
  border-radius: 6px;
}

.card-introduce {
  display: flex;
  flex-direction: column;
  height: 145px;
  padding-left: 6px;

  & > .title {
    margin-top: 2px;
    color: #222222;
  }

  & > .description {
    flex: 1;
    color: #6d757d;
  }

  & > .infos {
    & > * {
      margin-right: 12px;
      font-size: 14px;
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
        width: 14px;
        height: 14px;
        margin-right: 4px;
        background-image: url('/src/icons/view.png');
        background-size: 100%;
      }
    }
  }
}
</style>
