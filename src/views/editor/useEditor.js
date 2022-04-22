import { computed, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { get, remove, set } from '../../utils/storage'
import { pubPost } from '../../api/post'

export function useEditor(form) {
  const color = '#1d7dfa'
  const router = useRouter()
  const draftKey = 'post-draft'
  const draft = JSON.parse(get(draftKey))
  const wordCount = computed(() => `${form.title.length}/64`)
  const canSubmit = computed(() => {
    return form.title.length > 3 && form.content.length > 3 && form.acAgreement
  })
  const handles = {
    submit: () => {
      pubPost(toRaw(form)).finally(() => {
        // 这里后端标题一样虽然能提交但是报错。。
        ElNotification({ type: 'success', message: 'ok!' })
        remove(draftKey)
        setTimeout(() => router.push('/'), 400)
      })
    },
    store: () => {
      set(draftKey, JSON.stringify({ form: toRaw(form), date: Date.now() }))
    },
    restore: () => {
      form.title = draft.form.title
      form.content = draft.form.content
    },
    success: (res) => {
      form.attachment = res.data
      ElNotification({ type: 'success', message: '上传成功' })
    },
  }

  return { color, draftKey, draft, wordCount, canSubmit, handles }
}
