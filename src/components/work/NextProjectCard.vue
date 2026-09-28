<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Plus } from 'lucide-vue-next'
</script>

<template>
  <RouterLink
    to="/contact"
    class="group flex flex-col justify-between gap-10 rounded-2xl border border-dashed border-edge/15 p-6 transition-colors duration-300 hover:border-accent/50 sm:flex-row sm:items-center sm:p-8"
  >
    <div class="flex items-center gap-5">
      <span class="grid size-12 shrink-0 place-items-center rounded-full border border-edge/15 transition-colors group-hover:border-accent/60">
        <Plus class="size-5 text-fg-muted transition-transform duration-300 group-hover:rotate-90 group-hover:text-accent" aria-hidden="true" />
      </span>
      <div>
        <p class="text-xl font-semibold tracking-[-0.02em] text-fg">The next project could be yours.</p>
        <p class="mt-1 text-[0.9375rem] text-fg-muted">A product, a platform or a business system: tell us what you want to build.</p>
      </div>
    </div>
    <span class="font-mono text-xs tracking-wide text-fg-subtle transition-colors group-hover:text-fg">Build with us →</span>
  </RouterLink>
</template>
