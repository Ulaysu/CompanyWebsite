<script setup lang="ts">
import SectionLabel from '@/components/ui/SectionLabel.vue'
import { engineering } from '@/content/company'

/** Engineering as evidence: each practice, what it means, and the tools behind it. */
withDefaults(defineProps<{ index?: string }>(), { index: '05' })
</script>

<template>
  <section class="section border-t border-edge/[0.07]" aria-labelledby="engineering-title">
    <div class="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-4">
        <div class="lg:sticky lg:top-28">
          <SectionLabel :index="index" label="Engineering" />
          <h2 id="engineering-title" v-reveal="60" class="heading-xl mt-8">{{ engineering.title }}</h2>
          <p v-reveal="120" class="mt-6 max-w-sm text-lg leading-relaxed text-fg-muted">{{ engineering.lede }}</p>
        </div>
      </div>

      <div class="lg:col-span-8">
        <!-- Column heads, desktop only. -->
        <div class="hidden grid-cols-[minmax(0,4fr)_minmax(0,6fr)_minmax(0,4fr)] gap-6 border-b border-edge/20 pb-3 font-mono text-[0.625rem] tracking-[0.16em] text-fg-subtle uppercase sm:grid" aria-hidden="true">
          <span>Practice</span><span>What it means</span><span>With</span>
        </div>
        <dl>
          <div
            v-for="(p, i) in engineering.practices"
            :key="p.title"
            v-reveal="(i % 3) * 60"
            class="group grid grid-cols-1 gap-2 border-b border-edge/10 py-6 transition-colors duration-300 sm:grid-cols-[minmax(0,4fr)_minmax(0,6fr)_minmax(0,4fr)] sm:gap-6"
          >
            <dt class="flex items-baseline gap-3 text-lg font-semibold tracking-[-0.015em] text-fg">
              <span class="font-mono text-[0.625rem] font-normal text-fg-subtle">{{ String(i + 1).padStart(2, '0') }}</span>{{ p.title }}
            </dt>
            <dd class="text-[0.9375rem] leading-relaxed text-fg-muted">{{ p.body }}</dd>
            <dd v-if="p.tools?.length" class="font-mono text-[0.75rem] leading-relaxed text-fg">{{ p.tools.join(' · ') }}</dd>
            <dd v-else class="hidden font-mono text-[0.75rem] text-fg-subtle sm:block" aria-hidden="true">—</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
