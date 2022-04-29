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
        <tags-row style="display: inline;" :tags="data.tags" />
        <span class="svg-item view"><i />{{ data.pv }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { getDifficulty } from '/src/hooks/content/useArticle'
import TagsRow from '/src/components/TagsRow/index.vue'

const props = defineProps({
  // [id, firstPic, title, description, difficulty, pv, gmtCreate]
  data: { type: Object, required: true },
})
const { difColor, difText } = getDifficulty(props.data.difficulty)
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.read-card {
  display: block;
  height: 170px;
  padding: 10px;
  margin-bottom: 12px;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 4px;
  transition: transform 200ms;

  &:hover {
    box-shadow: $card-shadow;
    transform: translateY(-2px);
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
    color: $title-text-color;
  }

  & > .description {
    flex: 1;
    color: $deep-gray;
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
    }
  }
}
</style>
