<script setup lang="ts">
import SectionLabel from '@/components/ui/SectionLabel.vue'
import { buildProcess } from '@/content/company'

withDefaults(defineProps<{ index?: string }>(), { index: '04' })
</script>

<template>
  <section class="section" aria-labelledby="process-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <SectionLabel :index="index" label="Approach" />
          <h2 id="process-title" v-reveal="60" class="display mt-8">How we build.</h2>
        </div>
        <p v-reveal="120" class="lede lg:col-span-4 lg:col-start-9">
          One loop, for our own products and for partner work alike. It never really ends: what we observe in
          production becomes the next thing we understand.
        </p>
      </div>

      <ol class="relative mt-20 grid grid-cols-1 sm:mt-28 lg:grid-cols-5" aria-label="Our process">
        <!-- The line through every stage: horizontal on desktop, vertical on mobile. -->
        <span v-reveal class="reveal-line absolute top-[0.4375rem] right-0 left-0 hidden h-px bg-edge/25 lg:block" aria-hidden="true" />
        <span class="absolute top-2 bottom-2 left-[0.4375rem] w-px bg-edge/15 lg:hidden" aria-hidden="true" />

        <li v-for="(step, i) in buildProcess" :key="step.title" v-reveal="i * 110" class="relative pb-12 pl-10 last:pb-0 lg:pr-8 lg:pb-0 lg:pl-0">
          <span aria-hidden="true" class="absolute top-0 left-0 grid size-3.5 place-items-center border border-edge/40 bg-ink-950">
            <span class="size-1 bg-fg" />
          </span>
          <p class="font-mono text-[0.6875rem] text-fg-subtle lg:mt-10">{{ String(i + 1).padStart(2, '0') }}</p>
          <h3 class="mt-2 text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-4xl lg:text-[2.25rem] xl:text-[2.625rem]">{{ step.title }}</h3>
          <p class="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-fg-muted">{{ step.body }}</p>
        </li>
      </ol>

      <!-- The loop back. -->
      <div v-reveal="600" class="mt-12 hidden lg:block" aria-hidden="true">
        <svg viewBox="0 0 1000 40" preserveAspectRatio="none" class="h-10 w-full overflow-visible text-edge/25">
          <path d="M 990 0 V 24 Q 990 34 980 34 H 12 Q 4 34 4 26 V 6" fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke" />
          <path d="M 0 12 L 4 4 L 8 12" fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke" />
        </svg>
      </div>
      <p v-reveal class="mt-10 font-mono text-[0.6875rem] tracking-wide text-fg-subtle lg:mt-4">↺ Improve feeds back into Understand. Then again.</p>
    </div>
  </section>
</template>
