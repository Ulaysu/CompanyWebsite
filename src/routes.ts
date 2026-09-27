import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
  { path: '/services', name: 'services', component: () => import('@/pages/ServicesPage.vue') },
  { path: '/solutions', name: 'solutions', component: () => import('@/pages/SolutionsPage.vue') },
  { path: '/how-we-work', name: 'how-we-work', component: () => import('@/pages/HowWeWorkPage.vue') },
  { path: '/about', name: 'about', component: () => import('@/pages/AboutPage.vue') },
  { path: '/contact', name: 'contact', component: () => import('@/pages/ContactPage.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFoundPage.vue') },
]
