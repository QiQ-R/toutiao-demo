import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/search',
    component: () => import('@/views/search/index')
  },

  {
    path: '/',
    component: () => import('@/views/layout/index'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
