<script setup lang="ts">
import { principles } from '@/content/company'

/** Engineering principles: a list, not a sequence, so no numbers. */
withDefaults(defineProps<{ index?: string }>(), { index: '' })
</script>

<template>
  <section class="section pt-0 sm:pt-0 lg:pt-0" aria-labelledby="principles-title">
    <div class="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
      <h2 id="principles-title" class="heading-xl lg:col-span-4">The principles we engineer by.</h2>
      <ul class="divide-y divide-edge/10 border-y border-edge/10 lg:col-span-8">
        <li v-for="(p, i) in principles" :key="p.title" class="grid gap-1 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-baseline sm:gap-8">
          <h3 class="text-xl font-semibold tracking-[-0.02em] text-fg">{{ p.title }}</h3>
          <p class="leading-relaxed" :class="i === principles.length - 1 ? 'serif text-2xl text-fg italic' : 'text-fg-muted'">{{ p.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
