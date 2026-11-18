<script setup lang="ts">
import { capabilities } from '@/content/company'

/** Technical capabilities: what each practice means and the tools behind it. */
withDefaults(defineProps<{ index?: string }>(), { index: '' })
</script>

<template>
  <section class="section bg-ink-900" aria-labelledby="capabilities-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
        <h2 id="capabilities-title" class="heading-xl lg:col-span-7">We care about what happens after launch.</h2>
        <p class="lede lg:col-span-4 lg:col-start-9">Launch is the start. We build systems that survive real use, evolve without being rewritten and scale when they need to.</p>
      </div>
      <ul class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="p in capabilities" :key="p.title" class="card flex flex-col p-6">
          <h3 class="text-lg font-semibold tracking-[-0.02em] text-fg">{{ p.title }}</h3>
          <p class="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{{ p.body }}</p>
          <p v-if="p.tools?.length" class="mt-auto flex flex-wrap gap-1.5 pt-4">
            <span v-for="t in p.tools" :key="t" class="rounded-full bg-ink-900 px-2.5 py-1 text-xs font-medium text-fg">{{ t }}</span>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
