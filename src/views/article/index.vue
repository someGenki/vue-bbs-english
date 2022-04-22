<template>
  <div class="article-view">
    <!--展示:标题、标签集合、发布者信息、主体内容-->
    <article v-if="loaded" class="article-area">
      <h1 class="article-title">{{ article.title }}</h1>
      <tags-row :tags="article.tags" :difficulty="article.difficulty" />
      <meta-info :article="article" />
      <div
        class="markdown-body"
        :style="contentStyle"
        @dblclick.capture="getWord"
        v-html="marked(article.content)"
      />
    </article>
  </div>
  <setting-panel :settings="settings" />
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { ElNotification } from 'element-plus'
import '/src/styles/markdown-theme.scss'
import { getArticle, translate } from '/src/api/article'
import MetaInfo from '/src/components/MetaInfo/index.vue'
import SettingPanel from './SettingPanel.vue'
import TagsRow from './TagsRow.vue'

const aid = useRoute().params.aid
// [id,uid,tags,difficulty,content]
const article = ref(null)
const loaded = ref(false)
const settings = reactive({
  doubleTran: true,
  boldText: false,
  fontSize: 16,
  fontFamily: 'system-ui',
  color: '#212121',
  backgroundColor: '#fff',
})

const contentStyle = computed(() => ({
  fontWeight: settings.boldText ? 'bold' : '400',
  fontSize: settings.fontSize + 'px',
  fontFamily: settings.fontFamily,
  color: settings.color,
  backgroundColor: settings.backgroundColor,
}))

getArticle(aid).then((res) => {
  loaded.value = true
  article.value = res.data
  document.title = res.data.title + ' - 二元'
})

// 获取选中的单词 修建空格限制长度然后发送请求
const getWord = () => {
  if (!settings.doubleTran) return
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

  .meta-info-box {
    padding-top: 8px;
    background: #fbfbfb;
  }
}
</style>

<style>
@font-face {
  font-family: 'BreeSerif';
  src: url('/src/assets/fonts/BreeSerif.ttf');
}

@font-face {
  font-family: 'Consolas';
  src: local(Consolas);
}
</style>
