import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import Layout from '/src/layout/index.vue'
import TestView from '/src/views/sys/test/index.vue'
import navs from './nav'
import user from './user'
import { redirectRoute } from './helper'

const title = import.meta.env.VITE_DEFAULT_TITLE
const mode = import.meta.env.VITE_ROUTER_HISTORY
const base = import.meta.env.BASE_URL
const historyMode =
  mode === 'hash' ? createWebHashHistory(base) : createWebHistory(base)

const baseRoutes = [
  {
    path: '/',
    component: Layout,
    children: [
      ...navs,
      ...user,
      {
        path: '/post/:pid',
        name: 'Post',
        component: () => import('/src/views/post/index.vue'),
      },
      {
        path: '/article/:aid',
        name: 'Article',
        component: () => import('/src/views/article/index.vue'),
      },
      {
        path: '/space',
        component: () => import('/src/views/space/index.vue'),
      },
      {
        path: '/space/:uid',
        component: () => import('/src/views/space/index.vue'),
      },
      {
        path: '/notice',
        name: 'Notice',
        component: () => import('/src/views/notice/index.vue'),
        meta: { title: '消息 - 二元' },
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('/src/views/search/index.vue'),
        meta: { title: '搜索 - 二元' },
      },
      // 搜索、空间、内容发表
      {
        path: '/login',
        name: 'Login',
        component: () => import('/src/views/sys/login/index.vue'),
        meta: { title: '登录中🚀' },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('/src/views/sys/error-page/404.vue'),
        meta: { title: '该页面不存在' },
      },
    ],
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('/src/views/editor/index.vue'),
    meta: { title: '发表 - 二元' },
  },
  {
    path: '/test',
    name: 'Test',
    component: TestView,
    meta: { title: 'dev only' },
  },
  redirectRoute,
  {
    path: '/:catchAll(.*)*',
    redirect: '/404',
  },
]

const router = createRouter({
  history: historyMode,
  routes: baseRoutes,
})

router.afterEach((to) => {
  document.title = to.meta.title || title
})

router.refresh = () => router.replace('/redirect')

export default router
