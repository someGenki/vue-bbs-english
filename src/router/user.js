export default [
  {
    path: '/userinfo',
    redirect: '/userinfo/profile',
    component: () => import('/src/views/userinfo/index.vue'),
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('/src/views/userinfo/profile.vue'),
        meta: {
          title: '个人中心 - 个人信息',
          navName: '个人信息',
          icon: 'el-icon-document',
        },
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('/src/views/userinfo/setting.vue'),
        meta: {
          title: '个人中心 - 用户设置',
          navName: '用户设置',
          icon: 'el-icon-setting',
        },
      },
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('/src/views/userinfo/userPost.vue'),
        meta: {
          title: '帖子管理 - 内容管理',
          navName: '帖子管理',
          icon: 'el-icon-document-copy',
        },
      },
      {
        path: 'articles',
        name: 'Articles',
        component: () => import('/src/views/userinfo/userArticle.vue'),
        meta: {
          title: '文章管理 - 内容管理',
          navName: '文章管理',
          icon: 'el-icon-reading',
        },
      },
    ],
  },
]
