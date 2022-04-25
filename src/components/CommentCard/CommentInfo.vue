<template>
  <!--底部栏: 发布时间、点赞、评论、评论条数-->
  <div class="comment-info">
    <span v-if="data.gmtCreate" class="time">{{ data.gmtCreate }}</span>
    <span class="svg-item thumbs-up"><i />{{ data.likes || 0 }}</span>
    <span @click="switchShow" :class="{ showReply }" class="svg-item messenger">
      <i />{{ showReply ? '收起回复' : '回复' }}
    </span>
    <span v-if="false" class="total-reply">
      共&nbsp;{{ data.childrenCount }}&nbsp;条回复
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  showReply: { required: true },
  data: { type: Object, required: true },
  switchShow: { type: Function, required: true },
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.comment-info {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: $mild-gray;

  & > span {
    margin-right: 12px;
  }

  & > .showReply {
    color: $deep-blue;
  }

  & > .svg-item:hover {
    color: $deep-blue;
    cursor: pointer;
  }

  & > .total-reply {
    margin-right: 16px;
    margin-left: auto;
  }
}
</style>
