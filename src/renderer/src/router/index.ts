// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/init',
    meta: {}
  } as any,
  {
    path: '/init',
    name: 'init',
    meta: {
      requiresAuth: true,
      layout: 'init'
    },
    component: () => import('@/views/pages/init.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
