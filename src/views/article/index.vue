<template>
  <div class="article-view">
    <el-skeleton :loading="!loaded" :throttle="300">
      <!--展示:标题、标签集合、发布者信息、主体内容-->
      <article v-if="loaded" class="article-area">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-tags">
          <el-tag
            v-for="tag in article.tagList"
            :key="tag.name"
            :color="tag.color"
            effect="dark"
            round
          >
            {{ tag.name }}
          </el-tag>
          <el-tag :color="dif.difColor" effect="dark">{{ dif.difText }}</el-tag>
        </div>
        <meta-info
          style="background: #f5f5f5; padding-top: 8px"
          :article="article"
        />
        <div class="markdown-body" @dblclick.capture="getWord($event)" v-html="marked(article.content)" />
      </article>
    </el-skeleton>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getArticle } from '/src/api/article'
import { marked } from 'marked'
import { getStrColor } from '/src/utils/process'
import MetaInfo from '/src/components/MetaInfo/index.vue'
import '/src/styles/markdown-theme.scss'
import { getDifficulty } from '/src/hooks/content/useArticle'

// [id,uid,tags,difficulty,content]
const article = ref(null)
const loaded = ref(false)
const dif = reactive({})
const aid = useRoute().params.aid

// 分割用`-`连接的标签属性，返回数组。包含名字和随机颜色
const splitTags = (tags) => {
  tags = tags || '' // 防止返回非数组
  return tags.split('-').map((x) => ({ name: x, color: getStrColor(x) }))
}


// https://github.com/someGenki/vue_learn_english/blob/master/src/components/common/SourceText.vue

getArticle(aid).then((res) => {
  loaded.value = true
  article.value = res.data
  article.value.tagList = splitTags(res.data.tags)
  const { difColor, difText } = getDifficulty(res.data.difficulty)
  dif.difColor = difColor
  dif.difText = difText
  document.title = res.data.title +' - 二元'
})

const getWord = (event)=>{
  var sText =
    document.selection === undefined
      ? document.getSelection().toString()
      : document.selection.createRange().text
  sText = sText.trim()
  if (sText !== '') {
    if (sText.length > 20) sText = sText.substring(0, 20)
    // 发送请求、利用ElNotify创建提示  res.data.trans_result[0].dst
  }
}
</script>

<style lang="scss" scoped>
.article-view {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 18px;
  padding: 12px 18px;
  min-height: 400px;
  border-radius: 4px;
  background-color: #ffffff;
}

.article-tags {
  margin-bottom: 14px;

  & > .el-tag {
    margin-right: 12px;
    padding: 12px;
    border: none;

    &:last-child {
      float: right;
    }
  }
}
</style>
