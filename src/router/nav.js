export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('/src/views/home/index.vue'),
    meta: { title: '首页 - 学习，只有更早', navName: '首页' },
  },
  {
    path: '/read',
    name: 'Read',
    component: () => import('/src/views/read/index.vue'),
    meta: { title: '阅读 - 学习，只有更早', navName: '阅读', newest: true },
  },
  {
    path: '/tutorial',
    name: 'Tutorial',
    component: () => import('/src/views/message/index.vue'),
    meta: { title: '教程 - 二元论坛(🚧)', navName: '教程', disabled: true },
  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import('/src/views/rank/index.vue'),
    meta: { title: '排行 - 二元论坛(🚧)', navName: '排行' },
  },
  {
    path: '/event',
    name: 'Event',
    component: () => import('/src/views/message/index.vue'),
    meta: { title: '活动 - 二元论坛(🚧)', navName: '活动', disabled: true },
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('/src/views/message/index.vue'),
    meta: { title: '您提意见，我来改变', navName: '留言' },
  },
]
