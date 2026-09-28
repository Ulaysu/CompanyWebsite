<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import LogoMark from '@/components/ui/LogoMark.vue'
import { navigation, primaryCta, site } from '@/config/site'
import { projects } from '@/content/work'

const year = new Date().getFullYear()
const socials = [
  { label: 'GitHub', href: site.social.github },
  { label: 'LinkedIn', href: site.social.linkedin },
].filter((s): s is { label: string; href: string } => Boolean(s.href))
</script>

<template>
  <footer class="surface-dark relative border-t border-edge/[0.08]">
    <div class="container-page grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-24">
      <div class="md:col-span-5">
        <RouterLink to="/" class="inline-block rounded-md" :aria-label="`${site.name} — home`">
          <LogoMark />
        </RouterLink>
        <p class="mt-8 max-w-sm text-2xl font-semibold tracking-[-0.03em] text-fg">{{ site.tagline }}</p>
        <p class="mt-6 flex items-center gap-2 font-mono text-[0.6875rem] tracking-wide text-fg-subtle">
          <span class="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          {{ site.basedIn }}
        </p>
      </div>

      <nav aria-label="Footer" class="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
        <div>
          <h2 class="eyebrow mb-4">Company</h2>
          <ul class="space-y-3 text-sm">
            <li v-for="item in navigation" :key="item.to">
              <RouterLink :to="item.to" class="text-fg-muted transition-colors hover:text-fg">{{ item.label }}</RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="eyebrow mb-4">Now building</h2>
          <ul class="space-y-3 text-sm">
            <li v-for="p in projects" :key="p.slug">
              <RouterLink :to="`/work/${p.slug}`" class="text-fg-muted transition-colors hover:text-fg">{{ p.name }}</RouterLink>
            </li>
          </ul>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <h2 class="eyebrow mb-4">Contact</h2>
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
        </div>
      </nav>
    </div>
    <div class="border-t border-edge/[0.08]">
      <div class="container-page flex flex-col gap-2 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} {{ site.name }}. All rights reserved.</p>
        <p>{{ site.descriptor }}</p>
      </div>
    </div>
  </footer>
</template>
