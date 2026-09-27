<script setup lang="ts">
/** Chrome for a mock product interface. Decorative: hidden from assistive tech by callers when appropriate. */
withDefaults(defineProps<{ label?: string; live?: boolean }>(), { live: false })
</script>

<template>
  <div class="panel overflow-hidden">
    <div class="flex h-9 items-center gap-3 border-b border-white/[0.06] bg-white/[0.015] px-3.5">
      <span class="flex gap-1.5" aria-hidden="true">
        <span class="size-2.5 rounded-full bg-white/10" />
        <span class="size-2.5 rounded-full bg-white/10" />
        <span class="size-2.5 rounded-full bg-white/10" />
      </span>
      <span v-if="label" class="truncate font-mono text-[0.6875rem] text-fg-subtle">{{ label }}</span>
      <span v-if="live" class="ml-auto flex items-center gap-1.5 font-mono text-[0.625rem] tracking-wider text-fg-subtle uppercase">
        <span class="size-1.5 animate-pulse-dot rounded-full bg-positive" aria-hidden="true" />
        Live
      </span>
      <slot name="actions" />
    </div>
    <slot />
  </div>
</template>
