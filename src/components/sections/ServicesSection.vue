<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight, Boxes, Server, Users, Cloud, Sparkles, Compass } from 'lucide-vue-next'
import { services } from '@/content/company'

/** Engineering capabilities as a bento: the first two services get more room. */
withDefaults(defineProps<{ index?: string }>(), { index: '' })
const icons = [Boxes, Server, Users, Cloud, Sparkles, Compass]
const spans = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-3']
</script>

<template>
  <section class="section bg-ink-900" aria-labelledby="services-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
        <h2 id="services-title" class="heading-xl lg:col-span-7">Six engineering services, delivered by engineers who own the outcome.</h2>
        <p class="lede lg:col-span-4 lg:col-start-9">Start with one, or combine several. Each can run as a fixed-price project, time-and-materials, a dedicated team or consulting.</p>
      </div>

      <ul class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <li v-for="(s, i) in services" :key="s.id" :class="spans[i]">
          <RouterLink :to="`/engineering#${s.id}`" class="card group flex h-full flex-col p-6 transition-shadow hover:shadow-[0_1px_2px_rgb(10_31_68/0.06),0_20px_44px_-14px_rgb(10_31_68/0.22)] sm:p-7">
            <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-soft">
              <component :is="icons[i]" class="size-5" aria-hidden="true" />
            </span>
            <span class="mt-5 block">
              <span class="flex items-start justify-between gap-3">
                <span class="text-xl font-semibold tracking-[-0.02em] text-fg">{{ s.title }}</span>
                <ArrowUpRight class="mt-1 size-4 shrink-0 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
              </span>
              <span class="mt-2 block leading-relaxed text-fg-muted">{{ s.summary }}</span>
            </span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>
