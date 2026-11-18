<script setup lang="ts">
import { photos, photoSrc, photoSrcset, type PhotoName } from '@/content/photos'

/** Opening of an inner page: text on the left, an optional photograph in a frame on the right. */
defineProps<{ label?: string; title: string; lede?: string; photo?: PhotoName }>()
</script>

<template>
  <section class="relative overflow-hidden bg-ink-900 pt-32 pb-16 sm:pt-40 sm:pb-24" aria-labelledby="page-title">
    <div aria-hidden="true" class="bg-grid mask-radial pointer-events-none absolute inset-0" />
    <div class="container-page relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
      <div :class="photo ? 'lg:col-span-7' : 'lg:col-span-9'">
        <p v-if="label" class="index-label animate-fade-up">{{ label }}</p>
        <h1 id="page-title" class="mt-4 max-w-4xl animate-fade-up text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.045em] [animation-delay:60ms] sm:text-6xl">{{ title }}</h1>
        <p v-if="lede" class="lede mt-6 max-w-2xl animate-fade-up [animation-delay:120ms]">{{ lede }}</p>
        <div class="animate-fade-up [animation-delay:180ms]"><slot /></div>
      </div>
      <div v-if="photo" class="lg:col-span-5">
        <div class="card relative aspect-[4/3] animate-fade-up overflow-hidden [animation-delay:200ms]">
          <img
            decoding="async"
            fetchpriority="high"
            :alt="photos[photo]!.alt"
            sizes="(min-width: 1024px) 40vw, 100vw"
            :srcset="photoSrcset(photo)"
            :src="photoSrc(photo)"
            class="absolute inset-0 h-full w-full object-cover"
            :style="{ objectPosition: photos[photo]!.position }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
