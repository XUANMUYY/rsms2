// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/DashBoard',
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
  },
  {
    path: '/CardDemo',
    name: 'CardDemo',
    meta: {
      requiresAuth: true,
      layout: 'CardDemo'
    },
    component: () => import('@/views/pages/LotusCardDemo.vue')
  },
  {
    path: '/CupBoard',
    name: 'CupBoard',
    meta: {
      requiresAuth: true,
      layout: 'CupBoard'
    },
    component: () => import('@/views/pages/CupBoardPage.vue')
  },
  {
    path: '/CupBoardDemo',
    name: 'CupBoardDemo',
    meta: {
      requiresAuth: true,
      layout: 'CupBoardDemo'
    },
    component: () => import('@/views/pages/CupBoardDemo.vue')
  },
  {
    path: '/DetectorInit',
    name: 'DetectorInit',
    meta: {
      requiresAuth: true,
      layout: 'DetectorInit'
    },
    component: () => import('@/views/pages/DetectorInit.vue')
  },
  {
    path: '/ManageDemo',
    name: 'ManageDemo',
    meta: {
      requiresAuth: true,
      layout: 'ManageDemo'
    },
    component: () => import('@/views/pages/SourceListManageDemo.vue')
  },
  {
    path: '/DashBoard',
    name: 'DashBoard',
    meta: {
      requiresAuth: true,
      layout: 'DashBoard'
    },
    component: () => import('@/views/pages/DashBoard.vue')
  },
  {
    path: '/ProcessApply',
    name: 'ProcessApply',
    meta: {
      requiresAuth: true,
      layout: 'ProcessApply'
    },
    component: () => import('@/views/pages/ProcessApplyPage.vue')
  },
  {
    path: '/Tmp',
    name: 'Tmp',
    meta: {
      requiresAuth: true,
      layout: 'ProcessApply'
    },
    component: () => import('@/views/pages/Tmp.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
