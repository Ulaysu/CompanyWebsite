<script setup lang="ts">
import SectionLabel from '@/components/ui/SectionLabel.vue'
import { methodology } from '@/content/company'

/** The delivery methodology, shown as one continuous loop. */
withDefaults(defineProps<{ index?: string; headingLevel?: 'h2' | 'h3' }>(), { index: '04', headingLevel: 'h2' })
</script>

<template>
  <section class="section" aria-labelledby="process-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <SectionLabel :index="index" label="Delivery methodology" />
          <component :is="headingLevel" id="process-title" v-reveal="60" class="display mt-8">How we deliver.</component>
        </div>
        <p v-reveal="120" class="lede lg:col-span-4 lg:col-start-9">
          One delivery loop for client engagements and for our own products. What we observe in production becomes the next thing we understand.
        </p>
      </div>

      <ol class="relative mt-20 grid grid-cols-1 sm:mt-28 lg:grid-cols-5" aria-label="Delivery stages">
        <span v-reveal class="reveal-line absolute top-[0.4375rem] right-0 left-0 hidden h-px bg-edge/25 lg:block" aria-hidden="true" />
        <span class="absolute top-2 bottom-2 left-[0.4375rem] w-px bg-edge/15 lg:hidden" aria-hidden="true" />

        <li v-for="(step, i) in methodology" :key="step.title" v-reveal="i * 110" class="relative pb-12 pl-10 last:pb-0 lg:pr-8 lg:pb-0 lg:pl-0">
          <span aria-hidden="true" class="absolute top-0 left-0 grid size-3.5 place-items-center border border-edge/40 bg-ink-950">
            <span class="size-1 bg-fg" />
          </span>
          <p class="font-mono text-[0.6875rem] text-fg-subtle lg:mt-10">{{ String(i + 1).padStart(2, '0') }}</p>
          <h3 class="mt-2 text-2xl font-semibold tracking-[-0.04em] text-fg sm:text-3xl lg:text-[1.75rem] xl:text-[2rem]">{{ step.title }}</h3>
          <p class="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-fg-muted">{{ step.body }}</p>
        </li>
      </ol>
      <p v-reveal class="mt-12 font-mono text-[0.6875rem] tracking-wide text-fg-subtle">↺ Operate and improve feeds back into Understand. Then again.</p>
    </div>
  </section>
</template>
