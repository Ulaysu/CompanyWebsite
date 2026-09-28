<script setup lang="ts">
import { vision } from '@/content/company'

withDefaults(defineProps<{ index?: string; label?: string }>(), { index: '02', label: 'Vision' })
</script>

<template>
  <section class="border-t border-edge/[0.07]" aria-labelledby="vision-title">
    <div class="container-page grid grid-cols-1 gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-8">
        <p v-reveal class="index-label"><span v-if="index" class="text-accent">{{ index }}</span><span class="h-px w-6 bg-edge/20" aria-hidden="true" />{{ label }}</p>
        <h2 id="vision-title" v-reveal="60" class="statement mt-8">{{ vision.statement }}</h2>
      </div>
      <div class="flex flex-col justify-end lg:col-span-4">
        <ul class="flex flex-wrap gap-x-5 gap-y-1" aria-label="How we work">
          <li v-for="(s, i) in vision.stance" :key="s" v-reveal="i * 80" class="text-2xl font-semibold tracking-[-0.03em]" :class="i === vision.stance.length - 1 ? 'text-accent' : 'text-fg-subtle'">
            {{ s }}
          </li>
        </ul>
      </div>
      <div class="grid grid-cols-1 gap-6 text-lg leading-relaxed text-fg-muted sm:grid-cols-2 sm:gap-12 lg:col-span-8">
        <p v-for="(para, i) in vision.paragraphs" :key="i" v-reveal="i * 80">{{ para }}</p>
      </div>
    </div>
  </section>
</template>
