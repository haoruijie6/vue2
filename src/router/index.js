import Vue from 'vue'
import VueRouter from 'vue-router'
import indexView from '../views/file/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: indexView,
    meta: {
      title: '系统'
    }
  },
  {
    path: '/stateShow',
    name: 'stateShow',
    component: () => import('../views/file/index.vue'),
    meta: {
      title: '系统'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
