import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import type { NavigationLink } from '@/types'

export const navigationLinks: NavigationLink[] = [
  {
    name: 'Browse Jobs',
    path: '/',
    component: () => Promise.resolve(HomeView),
  },
  {
    name: 'Post a Job',
    path: '/post',
    component: () => import('../views/PostJobView.vue'),
  },
  {
    name: 'About',
    path: '/about',
    component: () => import('../views/AboutView.vue'),
  },
]

const additionalRoutes = [
  {
    path: '/job/:job',
    name: 'job-details',
    component: () => import('../views/JobDetailsView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...navigationLinks.map((link) => ({
      path: link.path,
      name: link.path === '/' ? 'home' : link.path.slice(1).replace('/', '-'),
      component: link.component,
    })),
    ...additionalRoutes,
  ],
})

export default router
