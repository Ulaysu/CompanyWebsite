<script setup lang="ts">
import type { Tone } from '@/content/solutions'

defineProps<{ tone: Tone; label: string }>()

const tones: Record<Tone, string> = {
  neutral: 'text-fg-muted bg-edge/[0.04] border-edge/10 [--dot:var(--color-fg-muted)]',
  accent: 'text-accent-soft bg-accent/10 border-accent/25 [--dot:var(--color-accent)]',
  positive: 'text-positive bg-positive/10 border-positive/20 [--dot:var(--color-positive)]',
  warning: 'text-warning bg-warning/10 border-warning/20 [--dot:var(--color-warning)]',
  muted: 'text-fg-subtle bg-transparent border-edge/10 [--dot:var(--color-fg-subtle)]',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.6875rem] leading-4 font-medium whitespace-nowrap',
      tones[tone],
    ]"
  >
    <span class="size-1.5 rounded-full bg-[var(--dot)]" aria-hidden="true" />
    {{ label }}
  </span>
</template>
