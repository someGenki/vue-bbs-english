import { computed, reactive, ref } from 'vue'

/**
 * 分页功能  我觉得抽离的很好！！！ 难点！
 * @example
 * const { loaded, models, disabled, loadMore, getPaging } = useGetPage(
 *   1,
 *   10,
 *   getPost,
 *   { delay: 300 }
 * )
 * @param {number} num 从第几页开始加载
 * @param {number} size 每次加载多少条
 * @param {(...args) => Promise} fetchData 加载数据的方法
 * @param {object | null | undefined } option 额外参数
 * @param args 加载数据的方法除去[num,size]以外的参数(用于loadMore)
 */
export function useGetPage(num, size, fetchData, option, ...args) {
  const loaded = ref(false) // 是否加载完成
  const models = reactive({}) // 存放mybatis-plus返回的分页类型
  const disabled = computed(() => models.current >= models.pages) // 是否还有更多页

  const getPaging = (num, size, ...args) => {
    fetchData(num, size, ...args).then((res) => {
      // 总数据条数
      models.total = res.data.total
      // 总页码数量
      models.pages = res.data.pages
      // 当前页码
      models.current = res.data.current
      if (num === 1) {
        models.records = []
        // 延迟一下体现我用了骨架屏
        if (option && option.delay) {
          setTimeout(() => {
            loaded.value = true
          }, option.delay)
        } else {
          loaded.value = true
        }
      }
      for (const item of res.data.records) {
        models.records.push(item)
      }
    })
  }

  const loadMore = () => {
    if (isNaN(models.current)) return
    getPaging(models.current + 1, size, ...args)
  }

  return { loaded, models, disabled, loadMore, getPaging }
}
