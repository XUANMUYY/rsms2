// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/SourceList',
    meta: {}
  } as any,
  {
    path: '/Init',
    name: 'Init',
    meta: {
      requiresAuth: true,
      layout: 'Init'
    },
    component: () => import('@/views/pages/InitPage.vue')
  },
  {
    path: '/SourceList',
    name: 'SourceList',
    meta: {
      requiresAuth: true,
      layout: 'SourceList'
    },
    component: () => import('@/views/pages/SourceListPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
