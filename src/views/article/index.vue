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
          style="padding-top: 8px; background: #fbfbfb"
          :article="article"
        />
        <div
          class="markdown-body"
          @dblclick.capture="getWord"
          v-html="marked(article.content)"
        />
      </article>
    </el-skeleton>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getArticle, translate } from '/src/api/article'
import { marked } from 'marked'
import { getStrColor } from '/src/utils/process'
import MetaInfo from '/src/components/MetaInfo/index.vue'
import '/src/styles/markdown-theme.scss'
import { getDifficulty } from '/src/hooks/content/useArticle'
import { ElNotification } from 'element-plus'

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
  document.title = res.data.title + ' - 二元'
})

const getWord = () => {
  let sText =
    document.selection === undefined
      ? document.getSelection().toString()
      : document.selection.createRange().text
  sText = sText.trim()
  if (sText !== '') {
    if (sText.length > 20) sText = sText.substring(0, 20)
    translate(sText).then(
      (res) => {
        const { src, dst } = res.data
        ElNotification({
          duration: 10000,
          type: 'success',
          title: '翻译结果',
          message: src + ': ' + dst,
        })
      },
      (err) => {
        console.log(err.data)
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.article-view {
  position: relative;
  width: 100%;
  max-width: 1000px;
  min-height: 400px;
  padding: 12px 18px;
  margin: 0 auto 18px;
  background-color: #ffffff;
  border-radius: 4px;
}

.article-tags {
  margin-bottom: 14px;

  & > .el-tag {
    padding: 12px;
    margin-right: 12px;
    border: none;

    &:last-child {
      float: right;
    }
  }
}
</style>
