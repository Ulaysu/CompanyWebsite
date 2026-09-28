<script setup lang="ts">
import SectionLabel from '@/components/ui/SectionLabel.vue'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import { engineering } from '@/content/company'

/** Engineering as evidence: each practice, what it means, and the tools behind it. */
withDefaults(defineProps<{ index?: string }>(), { index: '05' })
</script>

<template>
  <section aria-labelledby="engineering-title">
    <!-- Opening band: the infrastructure the work runs on. -->
    <div class="surface-dark relative isolate flex min-h-[64svh] items-end overflow-hidden">
      <PhotoBackdrop name="servers" fade="side" sizes="100vw" class="-z-10" />
      <div class="on-photo container-page w-full pt-40 pb-16 sm:pb-20">
        <SectionLabel :index="index" label="Engineering" />
        <h2 id="engineering-title" v-reveal="60" class="display mt-8 max-w-4xl">{{ engineering.title }}</h2>
        <p v-reveal="120" class="mt-8 max-w-xl text-lg leading-relaxed text-fg sm:text-xl">{{ engineering.lede }}</p>
      </div>
    </div>

    <div class="container-page section !pt-16 sm:!pt-24">
      <!-- Column heads, desktop only. -->
      <div class="hidden grid-cols-[minmax(0,4fr)_minmax(0,7fr)_minmax(0,5fr)] gap-8 border-b border-edge/20 pb-3 font-mono text-[0.625rem] tracking-[0.16em] text-fg-subtle uppercase sm:grid" aria-hidden="true">
        <span>Practice</span><span>What it means</span><span>With</span>
      </div>
      <dl>
        <div
          v-for="(p, i) in engineering.practices"
          :key="p.title"
          v-reveal="(i % 3) * 60"
          class="grid grid-cols-1 gap-2 border-b border-edge/10 py-6 sm:grid-cols-[minmax(0,4fr)_minmax(0,7fr)_minmax(0,5fr)] sm:gap-8"
        >
          <dt class="flex items-baseline gap-3 text-lg font-semibold tracking-[-0.015em] text-fg sm:text-xl">
            <span class="font-mono text-[0.625rem] font-normal text-fg-subtle">{{ String(i + 1).padStart(2, '0') }}</span>{{ p.title }}
          </dt>
          <dd class="text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base">{{ p.body }}</dd>
          <dd v-if="p.tools?.length" class="font-mono text-[0.75rem] leading-relaxed text-fg sm:text-[0.8125rem]">{{ p.tools.join(' · ') }}</dd>
          <dd v-else class="hidden font-mono text-[0.75rem] text-fg-subtle sm:block" aria-hidden="true">—</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
