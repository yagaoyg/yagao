import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
// import Home from '@/views/Home/index.vue'
// import Markdown from '@/views/Markdown/index.vue'
// import NoteList from '@/views/NoteList/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: '/md',
          name: 'NoteList',
          component: () => import('@/views/NoteList/index.vue')
        },
        {
          path: '/md/:id',
          name: 'Markdown',
          component: () => import('@/views/Markdown/index.vue'),
        }
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
