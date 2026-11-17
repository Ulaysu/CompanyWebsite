<script setup lang="ts">
import SectionLabel from '@/components/ui/SectionLabel.vue'
import { globalReach } from '@/content/company'
import { site } from '@/config/site'

/** Global positioning: founded in The Gambia, serving clients worldwide. No implied offices elsewhere. */
withDefaults(defineProps<{ index?: string }>(), { index: '07' })
</script>

<template>
  <section class="section" aria-labelledby="global-title">
    <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-6">
        <SectionLabel :index="index" label="Global positioning" />
        <h2 id="global-title" v-reveal="60" class="heading-xl mt-8">{{ globalReach.title }}</h2>
        <p v-reveal="120" class="mt-8 max-w-lg text-lg leading-relaxed text-fg-muted">{{ globalReach.lede }}</p>
        <p v-reveal="160" class="serif mt-10 text-4xl leading-none text-fg italic sm:text-5xl">{{ site.philosophy.phrase }}</p>
      </div>
      <ul class="border-t border-edge/15 lg:col-span-6">
        <li v-for="(p, i) in globalReach.points" :key="p.title" v-reveal="i * 80" class="border-b border-edge/10 py-7">
          <h3 class="text-xl font-semibold tracking-[-0.02em] text-fg sm:text-2xl">{{ p.title }}</h3>
          <p class="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{{ p.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
