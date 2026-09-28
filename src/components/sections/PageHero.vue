<script setup lang="ts">
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import type { PhotoName } from '@/content/photos'

/** Opening of an inner page. Always dark, so the header and type read the same in both themes. */
defineProps<{ label: string; title: string; lede?: string; photo?: PhotoName }>()
</script>

<template>
  <section class="surface-dark relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28" aria-labelledby="page-title">
    <PhotoBackdrop v-if="photo" :name="photo" eager fade="hero" />
    <div v-else aria-hidden="true" class="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-70" />
    <div class="container-page relative">
      <p class="index-label animate-fade-up">
        <span class="h-px w-6 bg-accent" aria-hidden="true" />{{ label }}
      </p>
      <h1 id="page-title" class="text-gradient mt-7 max-w-4xl animate-fade-up text-[2.625rem] leading-[1.02] font-semibold tracking-[-0.04em] [animation-delay:80ms] sm:text-6xl lg:text-7xl">
        {{ title }}
      </h1>
      <p v-if="lede" class="lede mt-7 max-w-2xl animate-fade-up text-fg-muted [animation-delay:160ms]">{{ lede }}</p>
      <div class="animate-fade-up [animation-delay:240ms]">
        <slot />
      </div>
    </div>
  </section>
</template>
