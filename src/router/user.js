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
          title: '个人中心 - 个人资料',
          navName: '个人资料',
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
    ],
  },
]
