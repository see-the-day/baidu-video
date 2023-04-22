import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/view/index/index.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/index' },
  { path: '/index', name: '登录', component: Index }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由前置守卫
router.beforeEach((to, _, next) => {
  next()
})

export default router
