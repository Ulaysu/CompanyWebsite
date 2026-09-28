import type { RouteRecordRaw } from 'vue-router'
import { projects } from '@/content/work'

/** Retired URLs from the previous site, kept so old links still land somewhere sensible. */
export const redirects: Record<string, string> = {
  '/services': '/what-we-build',
  '/solutions': '/work',
  '/how-we-work': '/what-we-build',
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
  { path: '/what-we-build', name: 'what-we-build', component: () => import('@/pages/WhatWeBuildPage.vue') },
  { path: '/about', name: 'about', component: () => import('@/pages/AboutPage.vue') },
  { path: '/contact', name: 'contact', component: () => import('@/pages/ContactPage.vue') },
  ...Object.entries(redirects).map<RouteRecordRaw>(([from, to]) => ({ path: from, redirect: to })),
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFoundPage.vue') },
]
