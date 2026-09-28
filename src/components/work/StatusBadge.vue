<script setup lang="ts">
import type { ProjectStatus } from '@/content/work'

defineProps<{ status: ProjectStatus }>()
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] leading-none whitespace-nowrap backdrop-blur-sm',
      status === 'Live'
        ? 'border-positive/30 bg-ink-950/60 text-positive'
        : 'border-signal/30 bg-ink-950/60 text-signal',
    ]"
  >
    <span :class="['size-1.5 rounded-full', status === 'Live' ? 'bg-positive' : 'animate-pulse-dot bg-signal']" aria-hidden="true" />
    {{ status }}
  </span>
</template>
