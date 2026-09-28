import type { RouteRecordRaw } from 'vue-router'
import { projects } from '@/content/work'

/**
 * Retired URLs, kept so old links still land somewhere sensible.
 * Keep in sync with vercel.json, public/_redirects and `redirectOnly` in vite.config.ts.
 */
export const redirects: Record<string, string> = {
  '/what-we-build': '/approach',
  '/services': '/approach',
  '/how-we-work': '/approach',
  '/solutions': '/work',
  '/work-with-us': '/contact',
  '/products/kujaaburun': '/work/kujaaburun',
  '/products/sweetland-farms': '/work/sweetland-farms-os',
  '/work/sweetland-farms': '/work/sweetland-farms-os',
}

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
  { path: '/work', name: 'work', component: () => import('@/pages/WorkPage.vue') },
  // One pre-rendered page per project.
  ...projects.map<RouteRecordRaw>((p) => ({
    path: `/work/${p.slug}`,
    name: `project-${p.slug}`,
    component: () => import('@/pages/ProjectPage.vue'),
    props: { slug: p.slug },
  })),
  { path: '/products', name: 'products', component: () => import('@/pages/ProductsPage.vue') },
  { path: '/approach', name: 'approach', component: () => import('@/pages/ApproachPage.vue') },
  { path: '/about', name: 'about', component: () => import('@/pages/AboutPage.vue') },
  { path: '/contact', name: 'contact', component: () => import('@/pages/ContactPage.vue') },
  ...Object.entries(redirects).map<RouteRecordRaw>(([from, to]) => ({ path: from, redirect: to })),
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFoundPage.vue') },
]
