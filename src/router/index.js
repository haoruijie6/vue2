import Vue from 'vue'
import VueRouter from 'vue-router'
import indexView from '../views/file'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: indexView,
    meta: {
      title: '文件管理系统'
    }
  },
  {
    path: '/stateShow',
    name: 'stateShow',
    component: () => import('../views/file'),
    meta: {
      title: '文件管理系统'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
