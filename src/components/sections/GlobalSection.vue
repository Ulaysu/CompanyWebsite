<script setup lang="ts">
import { globalReach } from '@/content/company'
import { site } from '@/config/site'

/** Global positioning, set as a navy band. No offices are implied outside The Gambia. */
withDefaults(defineProps<{ index?: string }>(), { index: '' })
</script>

<template>
  <section class="surface-dark relative overflow-hidden" aria-labelledby="global-title">
    <div class="tri-band-h h-1" aria-hidden="true" />
    <div class="container-page section grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-6">
        <h2 id="global-title" class="heading-xl">{{ globalReach.title }}</h2>
        <p class="mt-6 max-w-lg text-lg leading-relaxed text-fg-muted">{{ globalReach.lede }}</p>
        <p class="serif mt-10 text-5xl leading-none text-fg italic sm:text-6xl">{{ site.philosophy.phrase }}</p>
        <p class="mt-3 text-fg-muted">“{{ site.philosophy.meaning }}” <span class="text-fg-subtle">({{ site.philosophy.language }})</span></p>
      </div>
      <ul class="space-y-4 lg:col-span-6">
        <li v-for="p in globalReach.points" :key="p.title" class="rounded-2xl border border-edge/15 bg-edge/[0.04] p-6">
          <h3 class="text-xl font-semibold tracking-[-0.02em] text-fg">{{ p.title }}</h3>
          <p class="mt-2 leading-relaxed text-fg-muted">{{ p.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
