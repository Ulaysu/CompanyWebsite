<script setup lang="ts">
import SectionHeader from '@/components/ui/SectionHeader.vue'
import CtaInline from '@/components/sections/CtaInline.vue'
import { processSteps } from '@/content/process'

withDefaults(defineProps<{ detailed?: boolean }>(), { detailed: false })
</script>

<template>
  <section class="border-t border-edge/[0.06] py-24 sm:py-32" aria-labelledby="process-title">
    <div class="container-page">
      <SectionHeader
        eyebrow="How we work"
        title="A clear process, from first conversation to production."
        heading-id="process-title"
      />

      <ol class="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-edge/[0.06] bg-edge/[0.06] sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="(step, i) in processSteps"
          :key="step.number"
          v-reveal="(i % 3) * 80"
          class="group relative bg-ink-950 p-5 transition-colors duration-300 hover:bg-ink-900 sm:p-8"
        >
          <div class="flex items-center justify-between">
            <span class="font-mono text-xs text-fg-subtle">{{ step.number }}</span>
            <span class="h-px w-8 bg-edge/10 transition-[background-color,width] duration-500 group-hover:w-12 group-hover:bg-accent/70" aria-hidden="true" />
          </div>
          <h3 class="mt-3 text-lg sm:mt-8 font-semibold tracking-tight text-fg">{{ step.title }}</h3>
          <p class="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{{ step.summary }}</p>
          <template v-if="detailed">
            <p class="mt-4 text-sm leading-relaxed text-fg-subtle">{{ step.detail }}</p>
            <ul class="mt-5 space-y-1.5 border-t border-edge/[0.06] pt-4">
              <li v-for="d in step.deliverables" :key="d" class="flex items-center gap-2 font-mono text-[0.6875rem] text-fg-muted">
                <span class="size-1 rounded-full bg-accent/70" aria-hidden="true" />{{ d }}
              </li>
            </ul>
          </template>
        </li>
      </ol>

      <CtaInline
        class="mt-10"
        title="Have a process that shouldn't be this difficult?"
        button="Let's talk"
      />
    </div>
  </section>
</template>
