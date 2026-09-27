<script setup lang="ts">
import { problemDomains } from '@/content/general'
</script>

<template>
  <section class="border-y border-edge/[0.06] bg-ink-900/40" aria-labelledby="domains-title">
    <div class="container-page grid grid-cols-1 gap-8 py-12 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-14">
      <div class="lg:col-span-3">
        <h2 id="domains-title" class="text-lg font-medium tracking-tight text-fg">
          Built for businesses where the details matter.
        </h2>
        <p class="mt-2 text-sm text-fg-subtle">The kinds of operational problems we solve.</p>
      </div>
      <ul class="grid grid-cols-4 gap-px overflow-hidden rounded-xl border border-edge/[0.06] bg-edge/[0.06] sm:grid-cols-8 lg:col-span-9">
        <li
          v-for="(d, i) in problemDomains"
          :key="d.label"
          v-reveal="i * 40"
          class="flex flex-col items-center gap-2.5 bg-ink-950 px-1 py-5 text-center transition-colors duration-300 hover:bg-ink-900"
        >
          <component :is="d.icon" class="size-[18px] text-fg-subtle" aria-hidden="true" />
          <span class="text-[0.6875rem] font-medium text-fg-muted sm:text-xs">{{ d.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
