<script setup lang="ts">
import { site } from '@/config/site'

withDefaults(defineProps<{ showDescriptor?: boolean }>(), { showDescriptor: true })
</script>

<template>
  <span class="inline-flex items-center gap-3">
    <span
      class="relative grid size-8 shrink-0 place-items-center rounded-lg border border-edge/12 bg-gradient-to-b from-ink-700 to-ink-850 font-mono text-[0.6875rem] font-semibold tracking-tight text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]"
      aria-hidden="true"
    >
      {{ site.monogram }}
      <span class="absolute -right-px -bottom-px size-1.5 rounded-full bg-accent" />
    </span>
    <span class="flex flex-col leading-none">
      <span class="text-[0.9375rem] font-semibold tracking-[-0.01em] text-fg">{{ site.name }}</span>
      <span v-if="showDescriptor" class="mt-1 text-[0.6875rem] tracking-[0.01em] text-fg-subtle">
        {{ site.descriptor }}
      </span>
    </span>
  </span>
</template>
