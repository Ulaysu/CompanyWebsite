<script setup lang="ts">
import SectionHeader from '@/components/ui/SectionHeader.vue'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { engineering } from '@/content/company'

withDefaults(defineProps<{ index?: string }>(), { index: '05' })
</script>

<template>
  <section class="section" aria-labelledby="engineering-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-6">
          <SectionHeader :index="index" label="Engineering" :title="engineering.title" :lede="engineering.lede" heading-id="engineering-title" />
        </div>
        <figure v-reveal class="surface-dark relative aspect-[16/10] overflow-hidden rounded-2xl border border-edge/[0.07] lg:col-span-5 lg:col-start-8 lg:aspect-auto">
          <PhotoBackdrop name="circuit" fade="none" sizes="(min-width: 1024px) 520px, 100vw" />
        </figure>
      </div>

      <ul class="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-edge/[0.07] pt-12 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(p, i) in engineering.pillars" :key="p.title" v-reveal="(i % 3) * 70">
          <h3 class="flex items-center gap-3 text-base font-semibold text-fg">
            <span class="size-1.5 rounded-full bg-signal" aria-hidden="true" />{{ p.title }}
          </h3>
          <p class="mt-2 pl-[1.125rem] text-[0.9375rem] leading-relaxed text-fg-muted">{{ p.body }}</p>
        </li>
      </ul>

      <div v-reveal class="mt-16 flex flex-col gap-4 rounded-2xl border border-edge/[0.07] px-6 py-5 sm:flex-row sm:items-center sm:gap-8 sm:px-8">
        <p class="eyebrow shrink-0">Our stack</p>
        <ul class="flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm leading-relaxed text-fg-muted" aria-label="Technology stack">
          <li v-for="t in engineering.stack" :key="t" class="whitespace-nowrap">{{ t }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
