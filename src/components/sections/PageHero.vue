<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; lede?: string }>()
</script>

<template>
  <section class="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24" aria-labelledby="page-title">
    <div aria-hidden="true" class="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-60" />
    <div class="container-page relative">
      <p class="eyebrow flex animate-fade-up items-center gap-2"><span class="h-px w-5 bg-accent/70" aria-hidden="true" />{{ eyebrow }}</p>
      <h1 id="page-title" class="text-gradient mt-6 max-w-4xl animate-fade-up text-[2.375rem] leading-[1.04] font-semibold tracking-[-0.035em] [animation-delay:80ms] sm:text-6xl">
        {{ title }}
      </h1>
      <p v-if="lede" class="lede mt-6 max-w-2xl animate-fade-up [animation-delay:160ms]">{{ lede }}</p>
      <div class="animate-fade-up [animation-delay:240ms]">
        <slot />
      </div>
    </div>
  </section>
</template>
