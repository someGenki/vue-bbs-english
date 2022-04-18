import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import Layout from '/src/layout/index.vue'
import TestView from '/src/views/test/index.vue'
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
        path: '/content/:pid',
        name: 'Post',
        component: () => import('/src/views/post/index.vue'),
      },
      {
        path: '/article/:aid',
        name: 'Article',
        component: () => import('/src/views/article/index.vue'),
      },
      {
        path: '/notice',
        name: 'Notice',
        component: () => import('/src/views/notice/index.vue'),
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

/*const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/notice',
        name: 'notice',
        component: () => import('@/views/notice'),
      },
      {
        path: '/chat',
        name: 'chat',
        component: () => import('@/views/chat'),
      },
      {
        path: '/content/:pid',
        name: 'content',
        component: () => import('@/views/content'),
      },
      {
        path: '/article/:aid',
        name: 'article',
        component: () => import('@/views/article'),
      },
      {
        path: '/space/:uid',
        name: 'space',
        component: () => import('@/views/user/space'),
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/user/profile'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/publicity',
    name: 'Publicity',
    component: () => import('../views/other/Publicity.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'catch',
    component: Layout,
    children: [
      {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/views/error/NotFound'),
      },
    ],
  },
]*/

export default router
