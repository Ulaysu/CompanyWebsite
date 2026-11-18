<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import LogoMark from '@/components/ui/LogoMark.vue'
import { navigation, primaryCta, site } from '@/config/site'
import { founder } from '@/content/company'
import { products } from '@/content/products'
import { caseStudies } from '@/content/caseStudies'
import { services } from '@/content/company'

const year = new Date().getFullYear()
const socials = [
  { label: 'GitHub', href: site.social.github },
  { label: 'LinkedIn', href: site.social.linkedin },
  { label: 'X', href: site.social.x },
].filter((s): s is { label: string; href: string } => Boolean(s.href))
</script>

<template>
  <footer class="surface-dark relative overflow-hidden">
    <div class="tri-band-h h-1" aria-hidden="true" />
    <div class="container-page grid grid-cols-1 gap-14 pt-16 pb-14 md:grid-cols-12 md:gap-8 md:pt-24">
      <div class="md:col-span-6">
        <RouterLink to="/" class="inline-block" :aria-label="`${site.name}, home`">
          <LogoMark />
        </RouterLink>
        <p class="serif mt-10 text-4xl leading-none text-fg italic sm:text-5xl">{{ site.philosophy.phrase }}</p>
        <p class="mt-4 max-w-sm text-lg leading-snug text-fg-muted">“{{ site.philosophy.meaning }}”</p>
      </div>

      <nav aria-label="Footer" class="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-6">
        <div>
          <h2 class="eyebrow mb-5">Company</h2>
          <ul class="space-y-3 text-sm">
            <li v-for="item in navigation" :key="item.to">
              <RouterLink :to="item.to" class="text-fg-muted transition-colors hover:text-fg">{{ item.label }}</RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="eyebrow mb-5">Engineering</h2>
          <ul class="space-y-3 text-sm">
            <li v-for="s in services" :key="s.id">
              <RouterLink :to="`/engineering#${s.id}`" class="text-fg-muted transition-colors hover:text-fg">{{ s.title }}</RouterLink>
            </li>
          </ul>
          <h2 class="eyebrow mt-10 mb-5">Products</h2>
          <ul class="space-y-3 text-sm">
            <li v-for="p in products" :key="p.slug">
              <RouterLink :to="`/products/${p.slug}`" class="text-fg-muted transition-colors hover:text-fg">{{ p.name }}</RouterLink>
            </li>
          </ul>
          <ul v-if="caseStudies.length" class="mt-3 space-y-3 text-sm">
            <li v-for="c in caseStudies" :key="c.slug">
              <RouterLink :to="`/our-work/${c.slug}`" class="text-fg-subtle transition-colors hover:text-fg">Case study: {{ c.title }}</RouterLink>
            </li>
          </ul>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <h2 class="eyebrow mb-5">Contact</h2>
          <ul class="space-y-3 text-sm">
            <li>
              <RouterLink :to="primaryCta.to" class="text-fg-muted transition-colors hover:text-fg">{{ primaryCta.label }}</RouterLink>
            </li>
            <li v-if="site.email">
              <a :href="`mailto:${site.email}`" class="break-all text-fg-muted transition-colors hover:text-fg">{{ site.email }}</a>
            </li>
            <li v-for="s in socials" :key="s.label">
              <a :href="s.href" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-fg-muted transition-colors hover:text-fg">
                {{ s.label }}<ArrowUpRight class="size-3.5" aria-hidden="true" />
              </a>
            </li>
          </ul>
          <h2 class="eyebrow mt-10 mb-3">Founder</h2>
          <RouterLink to="/about#founder" class="text-sm text-fg-muted transition-colors hover:text-fg">
            {{ founder.name }}, {{ founder.role }}
          </RouterLink>
        </div>
      </nav>
    </div>

    <div class="relative border-t border-edge/[0.08]">
      <div class="container-page flex flex-col gap-2 py-6 text-[0.6875rem] tracking-wide text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} {{ site.name }}. All rights reserved.</p>
        <p>{{ site.originShort }}</p>
      </div>
    </div>
  </footer>
</template>
