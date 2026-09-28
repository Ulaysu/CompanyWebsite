<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import { partnership } from '@/content/company'

withDefaults(defineProps<{ index?: string; showCta?: boolean }>(), { index: '06', showCta: true })
</script>

<template>
  <section class="section border-t border-edge/[0.07]" aria-labelledby="partner-title">
    <div class="container-page">
      <SectionLabel :index="index" :label="partnership.label" />
      <h2 id="partner-title" v-reveal="60" class="statement mt-8 max-w-5xl">{{ partnership.title }}</h2>

      <div class="mt-16 grid grid-cols-1 gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <!-- Problem → Technology → Outcome -->
          <ol v-reveal class="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl" aria-label="Problem, then technology, then outcome">
            <template v-for="(step, i) in partnership.flow" :key="step">
              <li :class="i === partnership.flow.length - 1 ? 'text-fg' : 'text-fg-subtle'">{{ step }}</li>
              <li v-if="i < partnership.flow.length - 1" aria-hidden="true" class="font-normal text-fg-subtle/60">→</li>
            </template>
          </ol>
          <p v-reveal="80" class="mt-8 max-w-md text-lg leading-relaxed text-fg-muted">{{ partnership.body }}</p>
          <div v-if="showCta" v-reveal="140" class="mt-10">
            <AppButton to="/contact" size="lg" arrow>Start a conversation</AppButton>
          </div>
        </div>

        <div class="lg:col-span-6 lg:col-start-7">
          <p v-reveal class="eyebrow">Where we help</p>
          <ul class="mt-4 border-t border-edge/15">
            <li v-for="(a, i) in partnership.areas" :key="a" v-reveal="i * 50" class="flex items-baseline justify-between gap-4 border-b border-edge/10 py-4">
              <span class="text-xl tracking-[-0.02em] text-fg sm:text-2xl">{{ a }}</span>
              <span class="font-mono text-[0.625rem] text-fg-subtle">{{ String(i + 1).padStart(2, '0') }}</span>
            </li>
          </ul>

          <p v-reveal class="eyebrow mt-12">What we look for</p>
          <ul class="mt-4 space-y-2">
            <li v-for="f in partnership.fit" :key="f" v-reveal class="flex items-baseline gap-3 text-[0.9375rem] text-fg-muted">
              <span class="size-1 shrink-0 translate-y-[-2px] bg-fg-subtle" aria-hidden="true" />{{ f }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
