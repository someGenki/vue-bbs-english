<template>
  <div class="article-view">
    <!--展示:标题、标签集合、发布者信息、主体内容-->
    <article v-if="loaded" ref="articleRef" class="article-area">
      <h1 class="article-title">{{ article.title }}</h1>
      <tags-row :tags="article.tags" :difficulty="article.difficulty" />
      <meta-info @like="handleLike" :had-like="hadLike" :article="article" />
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
import { computed, reactive, ref, toRaw, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { ElNotification } from 'element-plus'
import '/src/styles/markdown-theme.scss'
import { getArticle, translate } from '/src/api/article'
import SettingPanel from './SettingPanel.vue'
import MetaInfo from '/src/components/MetaInfo/index.vue'
import TagsRow from '/src/components/TagsRow/index.vue'
import { get, set } from '/src/utils/storage'

const aid = useRoute().params.aid
const router = useRouter()
// [id,uid,tags,difficulty,content]
const article = ref(null)
const loaded = ref(false)
const hadLike = ref(false)
const articleRef = ref(null)

const settingsFromLocal = JSON.parse(get('article-setting'))
const settings = reactive(
  settingsFromLocal || {
    doubleTran: true,
    boldText: false,
    fontSize: 18,
    fontFamily: 'system-ui',
    color: '#212121',
    backgroundColor: '#fff',
  }
)

const contentStyle = computed(() => ({
  fontWeight: settings.boldText ? 'bold' : '400',
  fontSize: settings.fontSize + 'px',
  fontFamily: settings.fontFamily,
  color: settings.color,
  backgroundColor: settings.backgroundColor,
}))

getArticle(aid).then(
  (res) => {
    if (res.code === 2011) {
      return router.push('/404')
    }
    loaded.value = true
    article.value = res.data
    document.title = res.data.title + ' - 二元'
  },
  (err) => {
    ElNotification({ type: 'error', message: err.data.data })
  }
)

watch(settings, (o, n) => {
  set('article-setting', JSON.stringify(toRaw(n)))
})
const handleLike = () => {
  hadLike.value = !hadLike.value
  if (hadLike.value) {
    ElNotification({
      type: 'success',
      message: '推荐成功🎉',
      offset: 80,
    })
  }
}
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