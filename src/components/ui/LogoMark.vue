<script setup lang="ts">
import { site } from '@/config/site'

/**
 * The SOFORR mark: two linked rings, one in laterite, for “helping one another”,
 * followed by the wordmark.
 */
withDefaults(
  defineProps<{
    showDescriptor?: boolean
    /** Extra classes for the descriptor line, e.g. to hide it where space is tight. */
    descriptorClass?: string
  }>(),
  { showDescriptor: false, descriptorClass: '' },
)
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <svg viewBox="0 0 32 20" class="h-[1.05rem] w-auto shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" stroke-width="2.5" class="text-fg" />
      <circle cx="22" cy="10" r="7.25" fill="none" stroke="currentColor" stroke-width="2.5" class="text-accent" />
      <!-- Re-draw the top of the first ring over the second, so the rings interlock. -->
      <path d="M 15.13 4.87 A 7.25 7.25 0 0 1 17.25 10" fill="none" stroke="currentColor" stroke-width="2.5" class="text-fg" />
    </svg>
    <span class="flex items-baseline gap-3 leading-none">
      <span class="text-[1.0625rem] font-semibold tracking-[0.14em] whitespace-nowrap text-fg">{{ site.name }}</span>
      <span v-if="showDescriptor" :class="['hidden font-mono text-[0.625rem] tracking-[0.14em] whitespace-nowrap text-fg-subtle uppercase sm:inline', descriptorClass]">
        {{ site.descriptor }}
      </span>
    </span>
  </span>
</template>
