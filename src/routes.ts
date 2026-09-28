import type { RouteRecordRaw } from 'vue-router'
import { products } from '@/content/products'

/**
 * Retired URLs, kept so old links still land somewhere sensible.
 * Keep in sync with public/_redirects and `redirectOnly` in vite.config.ts.
 */
export const redirects: Record<string, string> = {
  '/services': '/what-we-build',
  '/solutions': '/products',
  '/how-we-work': '/what-we-build',
  '/work': '/products',
  '/contact': '/work-with-us',
  ...Object.fromEntries(products.map((p) => [`/work/${p.slug}`, `/products/${p.slug}`])),
}

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
  { path: '/what-we-build', name: 'what-we-build', component: () => import('@/pages/WhatWeBuildPage.vue') },
  { path: '/products', name: 'products', component: () => import('@/pages/ProductsPage.vue') },
  // One pre-rendered page per product.
  ...products.map<RouteRecordRaw>((p) => ({
    path: `/products/${p.slug}`,
    name: `product-${p.slug}`,
    component: () => import('@/pages/ProductPage.vue'),
    props: { slug: p.slug },
  })),
  { path: '/about', name: 'about', component: () => import('@/pages/AboutPage.vue') },
  { path: '/work-with-us', name: 'work-with-us', component: () => import('@/pages/WorkWithUsPage.vue') },
  ...Object.entries(redirects).map<RouteRecordRaw>(([from, to]) => ({ path: from, redirect: to })),
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFoundPage.vue') },
]
