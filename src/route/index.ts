import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getUserInfo } from '@/util'
import Login from '@/view/login/index.vue'
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: '登录', component: Login },
  {
    path: '/404',
    component: () => import('@/view/404/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

// 路由前置守卫
const excludes = ['/404', '/login']
router.beforeEach((to, _, next) => {
  const menu = getUserInfo('menu') || []
  if (!menu.length && to.path !== '/login') {
    next('/')
  }
  if (excludes.includes(to.path) || menu.includes(to.path)) {
    next()
  } else {
    next('/404')
  }
})

export default router
