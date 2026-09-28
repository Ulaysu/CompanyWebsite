<script setup lang="ts">
import { RouterLink } from 'vue-router'

/** An honest placeholder for what is next. No names, no dates, no promises. */
withDefaults(defineProps<{ nextIndex: number; compact?: boolean }>(), { compact: false })
</script>

<template>
  <div
    v-reveal
    class="relative grid grid-cols-1 gap-10 border border-dashed border-edge/15 p-8 sm:p-12"
    :class="compact ? 'content-between' : 'lg:grid-cols-12 lg:items-end'"
  >
    <div :class="compact ? '' : 'lg:col-span-7'">
      <p class="font-mono text-[0.6875rem] tracking-[0.16em] text-fg-subtle uppercase">{{ String(nextIndex).padStart(2, '0') }} / In the works</p>
      <p class="mt-6 font-semibold tracking-[-0.045em] text-fg" :class="compact ? 'text-5xl' : 'text-5xl sm:text-7xl'">
        More coming<span class="text-fg-subtle">.</span>
      </p>
    </div>
    <div :class="compact ? '' : 'lg:col-span-5'">
      <p class="text-lg leading-relaxed text-fg-muted">
        Building our own products is the surest way to prove what SOFORR can do. More are on the way. They will
        appear here when they are real, not before.
      </p>
      <RouterLink to="/contact" class="mt-6 inline-block border-b border-edge/30 pb-1 text-sm font-medium text-fg transition-colors hover:border-fg">
        Have a problem we should build around? Tell us.
      </RouterLink>
    </div>
  </div>
</template>
