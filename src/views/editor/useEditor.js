import { computed, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { get, remove, set } from '/src/utils/storage'
import { pubPost } from '/src/api/post'
import { uploadImage } from '/src/api/file'

export function useEditor(form, type) {
  const color = '#1d7dfa'
  const router = useRouter()
  const draftKey = type + '-draft'
  const draft = JSON.parse(get(draftKey))
  const wordCount = computed(() => `${form.title.length}/64`)
  const canSubmit = computed(() => {
    return form.title.length > 3 && form.content.length > 3 && form.acAgreement
  })
  const handles = {
    submit: () => {
      // pubPost根据type换成pubArticle
      pubPost(toRaw(form)).finally(() => {
        ElNotification({ type: 'success', message: 'ok!' })
        remove(draftKey)
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
    success: (res) => {
      form.attachment = res.data
      ElNotification({ type: 'success', message: '上传成功' })
    },
    /**
     *
     * @param {FileList} files 选中的文件
     * @param {(urls: string[]) => void} callback 将urls通知editor
     */
    upload: (files, callback) => {
      const promises = Array.from(files).map(uploadImage)
      Promise.all(promises).then((res) => {
        callback(res.map((i) => i.data)) // 取出响应中的data
      })
    },
  }

  return { color, draftKey, draft, wordCount, canSubmit, handles }
}
