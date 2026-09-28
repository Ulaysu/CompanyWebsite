<script setup lang="ts">
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { principles } from '@/content/company'

withDefaults(defineProps<{ index?: string }>(), { index: '06' })
</script>

<template>
  <section class="section border-t border-edge/[0.06]" aria-labelledby="principles-title">
    <div class="container-page">
      <SectionHeader :index="index" label="How we think" title="Principles we build by." heading-id="principles-title" />
      <ol class="mt-14 grid grid-cols-1 gap-x-16 gap-y-12 sm:mt-20 md:grid-cols-2">
        <li v-for="(p, i) in principles" :key="p.title" v-reveal="(i % 2) * 90" class="border-t border-edge/10 pt-8">
          <span class="font-mono text-xs text-accent">0{{ i + 1 }}</span>
          <h3 class="mt-5 text-2xl font-semibold tracking-[-0.025em] text-fg sm:text-3xl">{{ p.title }}</h3>
          <p class="mt-4 max-w-md text-lg leading-relaxed text-fg-muted">{{ p.body }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
