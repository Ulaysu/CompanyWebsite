<script setup lang="ts">
import { belief } from '@/content/company'
import { site } from '@/config/site'

withDefaults(defineProps<{ index?: string }>(), { index: '01' })
</script>

<template>
  <section class="section" aria-labelledby="belief-title">
    <div class="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-5">
        <p v-reveal class="index-label">
          <span v-if="index" class="text-accent">{{ index }}</span><span class="h-px w-6 bg-edge/20" aria-hidden="true" />Our belief
        </p>
        <div class="lg:sticky lg:top-32">
          <p v-reveal="60" class="serif mt-10 text-[3.5rem] leading-[0.92] text-fg italic sm:text-7xl lg:text-[5.5rem]">
            {{ site.philosophy.phrase }}
          </p>
          <p v-reveal="120" class="mt-6 max-w-xs text-lg leading-snug text-fg-muted">“{{ site.philosophy.meaning }}”</p>
          <p v-reveal="160" class="mt-3 font-mono text-[0.6875rem] tracking-wide text-fg-subtle">{{ site.philosophy.language }}</p>
        </div>
      </div>

      <div class="lg:col-span-6 lg:col-start-7 lg:pt-10">
        <h2 id="belief-title" v-reveal class="heading-xl">{{ belief.title }}</h2>
        <div class="mt-8 space-y-4 text-lg leading-relaxed text-fg-muted">
          <p v-for="(para, i) in belief.body" :key="i" v-reveal="60 + i * 60" :class="i === belief.body.length - 1 ? 'text-fg' : ''">{{ para }}</p>
        </div>

        <ul class="mt-14 border-t border-edge/10" aria-label="What technology should do">
          <li
            v-for="(line, i) in belief.lines"
            :key="line"
            v-reveal="i * 70"
            class="group grid grid-cols-[2.5rem_1fr] items-baseline gap-2 border-b border-edge/10 py-5 sm:py-6"
          >
            <span class="font-mono text-xs text-fg-subtle transition-colors group-hover:text-accent">0{{ i + 1 }}</span>
            <p class="text-xl leading-snug tracking-[-0.02em] sm:text-2xl">
              <span class="text-fg-subtle">Technology should </span><span class="font-medium text-fg">{{ line }}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
