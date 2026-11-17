import type { RouteRecordRaw } from 'vue-router'
import { products } from '@/content/products'
import { caseStudies } from '@/content/caseStudies'
import { redirects } from '@/redirects'

export { redirects }

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
  { path: '/engineering', name: 'engineering', component: () => import('@/pages/EngineeringPage.vue') },
  { path: '/products', name: 'products', component: () => import('@/pages/ProductsPage.vue') },
  // One pre-rendered page per product and per case study.
  ...products.map<RouteRecordRaw>((p) => ({
    path: `/products/${p.slug}`,
    name: `product-${p.slug}`,
    component: () => import('@/pages/ProductPage.vue'),
    props: { slug: p.slug },
  })),
  { path: '/our-work', name: 'our-work', component: () => import('@/pages/OurWorkPage.vue') },
  ...caseStudies.map<RouteRecordRaw>((c) => ({
    path: `/our-work/${c.slug}`,
    name: `case-${c.slug}`,
    component: () => import('@/pages/CaseStudyPage.vue'),
    props: { slug: c.slug },
  })),
  { path: '/about', name: 'about', component: () => import('@/pages/AboutPage.vue') },
  { path: '/contact', name: 'contact', component: () => import('@/pages/ContactPage.vue') },
  ...Object.entries(redirects).map<RouteRecordRaw>(([from, to]) => ({ path: from, redirect: to })),
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFoundPage.vue') },
]
