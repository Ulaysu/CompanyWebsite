<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'
import { caseStudies } from '@/content/caseStudies'

/** Selected client work. Only published, permitted case studies appear. */
withDefaults(defineProps<{ index?: string }>(), { index: '' })
</script>

<template>
  <section class="section bg-ink-900" aria-labelledby="selected-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
        <h2 id="selected-title" class="heading-xl lg:col-span-7">Client work, published with permission.</h2>
        <p class="lede lg:col-span-4 lg:col-start-9">Each case study states the problem, scope and approach, and adds results only once they are real.</p>
      </div>
      <div class="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <RouterLink v-for="c in caseStudies" :key="c.slug" :to="`/our-work/${c.slug}`" class="card group flex flex-col p-7 transition-shadow hover:shadow-[0_20px_44px_-14px_rgb(10_31_68/0.25)] sm:p-9">
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <span class="rounded-full bg-accent/10 px-2.5 py-1 font-medium text-accent-soft">{{ c.status }}</span>
            <span class="text-fg-subtle">{{ c.sector }}</span>
          </div>
          <h3 class="mt-6 text-3xl font-semibold tracking-[-0.04em] text-fg">{{ c.title }}</h3>
          <p class="mt-2 text-sm text-fg-subtle">Client: {{ c.client }}, {{ c.clientLocation }}</p>
          <p class="mt-4 text-lg leading-snug text-fg-muted">{{ c.summary }}</p>
          <span class="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-fg">Read the case study <ArrowRight class="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
        </RouterLink>
        <div class="flex flex-col justify-between rounded-2xl border border-dashed border-edge/20 p-7 sm:p-9">
          <p class="text-lg leading-relaxed text-fg-muted">Our own products are listed separately and are not client work.</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppButton to="/our-work" variant="secondary" arrow>See all work</AppButton>
            <AppButton to="/contact" variant="secondary">Start a Project</AppButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
