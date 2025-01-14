import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

type NavigationLink = {
  name: string
  path: string
  component: () => Promise<any>
}

export const navigationLinks: NavigationLink[] = [
  {
    name: 'Home',
    path: '/',
    component: () => Promise.resolve(HomeView),
  },
  {
    name: 'Browse Jobs',
    path: '/browse-jobs',
    component: () => import('../views/BrowseView.vue'),
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
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
      name: 'home'
    },
    {
      path: '/browse-jobs',
      component: () => import('@/views/BrowseView.vue'),
      name: 'browse-jobs'
    },
    ...navigationLinks.map((link) => ({
      path: link.path,
      name: link.path === '/' ? 'home' : link.path.slice(1).replace('/', '-'),
      component: link.component,
    })),
    ...additionalRoutes,
  ],
})

export default router
