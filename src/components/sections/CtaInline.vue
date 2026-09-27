<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'

defineProps<{ title: string; body?: string; button: string; to?: string }>()
</script>

<template>
  <div
    v-reveal
    class="relative flex flex-col gap-6 overflow-hidden rounded-xl border border-edge/[0.08] bg-gradient-to-br from-ink-800 to-ink-900 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
  >
    <div aria-hidden="true" class="pointer-events-none absolute -top-24 -right-10 size-64 rounded-full bg-accent/[0.08] blur-3xl" />
    <div class="relative">
      <p class="text-lg font-medium tracking-tight text-fg sm:text-xl">{{ title }}</p>
      <p v-if="body" class="mt-1.5 text-sm text-fg-muted">{{ body }}</p>
    </div>
    <AppButton :to="to ?? '/contact'" arrow class="relative self-start sm:self-auto">{{ button }}</AppButton>
  </div>
</template>
