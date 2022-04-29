import { computed, reactive, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { get, remove, set } from '/src/utils/storage'
import { pubPost } from '/src/api/post'
import { uploadImage } from '/src/api/file'
import { commitArticle } from '/src/api/article'

const baseForm = { title: '', content: '', tags: '外语', acAgreement: true }
const formOfPost = { category: 'default', attachment: '' }
const formOfArticle = { description: '', difficulty: 1, firstPic: '' }

const hasBase = (form) =>
  form.title.length > 3 && form.content.length > 3 && form.acAgreement
const articleVerify = (form) => form.firstPic && form.description.length > 3

export function useEditor(type) {
  const router = useRouter()
  const draftKey = type + '-draft'
  const placeText =
    type === 'post' ? '请输入帖子标题（64字以内）' : '请输入文章标题(64字以内)'
  const draft = JSON.parse(get(draftKey))
  const wordCount = computed(() => `${form.title.length}/64`)
  const canSubmit = computed(() => {
    return hasBase(form) && (type === 'article' ? articleVerify(form) : true)
  })

  const initForm = Object.assign(
    baseForm,
    type === 'post' ? formOfPost : formOfArticle
  )
  // 根据type生成具体的表单对象，title、content、tags、acAgreement为共有属性
  const form = reactive(JSON.parse(JSON.stringify(initForm)))

  // 事件处理器
  const handles = {
    // 保存、发布(帖子、文章)
    submit: () => {
      let fn
      if (type === 'article') fn = commitArticle
      else fn = pubPost
      fn(toRaw(form)).finally(() => {
        ElNotification({ type: 'success', message: 'ok!' })
        remove(draftKey)
        Object.entries(initForm).forEach((k, v) => (form[k] = v))
        setTimeout(() => router.push('/'), 400)
      })
    },
    store: () => {
      set(draftKey, JSON.stringify({ form: toRaw(form), date: Date.now() }))
      ElNotification({ type: 'success', message: '草稿保存成功' })
    },
    clear: () => {
      remove(draftKey)
      ElNotification({ type: 'success', message: '草稿删除成功' })
    },
    restore: () => {
      form.title = draft.form.title
      form.content = draft.form.content
    },
    /**
     * 上传后，赋值url给form对应的属性
     */
    uploadSuccess: (res) => {
      if (type === 'post') form.attachment = res.data
      if (type === 'article') form.firstPic = res.data
      ElNotification({ type: 'success', message: '上传成功' })
    },
    /**
     *
     * @param  files 选中的文件
     * @param {(urls: string[]) => void} callback 将urls通知editor
     */
    upload: (files, callback) => {
      const promises = files.map((file) => uploadImage(file))
      Promise.all(promises).then((res) => {
        callback(res.map((i) => i.data)) // 取出响应中的data
      })
    },
  }

  return { draftKey, draft, wordCount, canSubmit, handles, form, placeText }
}
