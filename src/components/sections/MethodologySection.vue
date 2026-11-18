<script setup lang="ts">
import { methodology } from '@/content/company'

/** The delivery methodology. This is a real sequence, so it is numbered. */
withDefaults(defineProps<{ index?: string; headingLevel?: 'h2' | 'h3' }>(), { index: '', headingLevel: 'h2' })
</script>

<template>
  <section class="section" aria-labelledby="process-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
        <component :is="headingLevel" id="process-title" class="heading-xl lg:col-span-7">How every engagement is delivered.</component>
        <p class="lede lg:col-span-4 lg:col-start-9">One loop for client work and for our own products. What we see in production feeds the next round of understanding.</p>
      </div>
      <ol class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Delivery stages">
        <li v-for="(step, i) in methodology" :key="step.title" class="card relative p-6">
          <span class="grid size-8 place-items-center rounded-full bg-fg text-sm font-semibold text-ink-950">{{ i + 1 }}</span>
          <h3 class="mt-5 text-xl font-semibold tracking-[-0.02em] text-fg">{{ step.title }}</h3>
          <p class="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{{ step.body }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
