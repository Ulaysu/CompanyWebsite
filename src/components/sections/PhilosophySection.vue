<script setup lang="ts">
import SectionLabel from '@/components/ui/SectionLabel.vue'
import { philosophy } from '@/content/company'
import { site } from '@/config/site'

/** Why SOFORR exists. The one place the site slows down. */
withDefaults(defineProps<{ index?: string }>(), { index: '01' })
</script>

<template>
  <section class="section overflow-hidden" aria-labelledby="philosophy-title">
    <div class="container-page">
      <SectionLabel :index="index" label="Why we exist" />

      <!-- The phrase, set large. -->
      <div class="mt-12 sm:mt-16">
        <p id="philosophy-title" v-reveal="60" class="serif text-[4.25rem] leading-[0.88] text-fg italic sm:text-[8rem] lg:text-[11rem] xl:text-[12.5rem]">
          {{ site.philosophy.phrase }}
        </p>
        <div v-reveal="160" class="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-baseline sm:gap-6">
          <p class="text-2xl leading-snug tracking-[-0.02em] text-fg sm:text-[2rem]">{{ site.philosophy.meaning }}</p>
          <p class="font-mono text-[0.6875rem] tracking-[0.16em] text-fg-subtle uppercase">{{ site.philosophy.language }}</p>
        </div>
      </div>

      <div v-reveal class="reveal-line mt-20 h-px bg-edge/15 sm:mt-28" aria-hidden="true" />

      <div class="mt-12 grid grid-cols-1 gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <h2 v-reveal class="heading-xl">{{ philosophy.title }}</h2>
          <p v-reveal="80" class="mt-8 max-w-md text-lg leading-relaxed text-fg-muted">{{ philosophy.origin }}</p>
          <p v-reveal="140" class="mt-4 max-w-md text-lg leading-relaxed text-fg">{{ philosophy.body }}</p>
        </div>

        <ol class="lg:col-span-6 lg:col-start-7" aria-label="What technology is for">
          <li
            v-for="(line, i) in philosophy.lines"
            :key="line"
            v-reveal="i * 80"
            class="group flex items-baseline gap-5 border-t border-edge/10 py-5 last:border-b sm:py-6"
          >
            <span class="w-6 shrink-0 font-mono text-[0.6875rem] text-fg-subtle">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="text-xl leading-snug tracking-[-0.02em] text-fg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 sm:text-[1.625rem]">{{ line }}</span>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
