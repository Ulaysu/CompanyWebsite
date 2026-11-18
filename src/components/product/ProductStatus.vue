<script setup lang="ts">
import type { ProductStatus } from '@/content/products'

defineProps<{ status: ProductStatus }>()
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium leading-none whitespace-nowrap',
      status === 'Live' ? 'border-positive/30 bg-positive/10 text-positive' : 'border-accent/30 bg-accent/10 text-accent-soft',
    ]"
  >
    <span :class="['size-1.5 rounded-full', status === 'Live' ? 'bg-positive' : 'animate-pulse-dot bg-accent']" aria-hidden="true" />
    {{ status }}
  </span>
</template>
