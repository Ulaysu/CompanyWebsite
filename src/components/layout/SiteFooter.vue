<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import LogoMark from '@/components/ui/LogoMark.vue'
import { navigation, primaryCta, site } from '@/config/site'
import { founder } from '@/content/company'
import { projects } from '@/content/work'

const year = new Date().getFullYear()
const socials = [
  { label: 'GitHub', href: site.social.github },
  { label: 'LinkedIn', href: site.social.linkedin },
  { label: 'X', href: site.social.x },
].filter((s): s is { label: string; href: string } => Boolean(s.href))
</script>

<template>
  <footer class="surface-dark relative overflow-hidden border-t border-edge/[0.08]">
    <div class="container-page grid grid-cols-1 gap-14 pt-20 pb-12 md:grid-cols-12 md:gap-8 md:pt-28">
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
          <h2 class="eyebrow mb-5">Work</h2>
          <ul class="space-y-3 text-sm">
            <li v-for="p in projects" :key="p.slug">
              <RouterLink :to="`/work/${p.slug}`" class="text-fg-muted transition-colors hover:text-fg">{{ p.name }}</RouterLink>
            </li>
          </ul>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <h2 class="eyebrow mb-5">Contact</h2>
          <ul class="space-y-3 text-sm">
            <li>
              <RouterLink :to="primaryCta.to" class="text-fg-muted transition-colors hover:text-fg">{{ primaryCta.label }}</RouterLink>
            </li>
            <li>
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
            {{ founder.name }} <span class="text-fg-subtle">/</span> {{ founder.handle }}
          </RouterLink>
        </div>
      </nav>
    </div>

    <!-- Oversized wordmark, cropped by the page edge. -->
    <div aria-hidden="true" class="container-page pointer-events-none select-none">
      <p class="wordmark -mb-[0.2em] text-[24vw] leading-[0.8] text-fg/[0.045] lg:text-[21rem]">{{ site.name }}</p>
    </div>

    <div class="relative border-t border-edge/[0.08]">
      <div class="container-page flex flex-col gap-2 py-6 font-mono text-[0.6875rem] tracking-wide text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} {{ site.name }}. All rights reserved.</p>
        <p>{{ site.originShort }}</p>
      </div>
    </div>
  </footer>
</template>
