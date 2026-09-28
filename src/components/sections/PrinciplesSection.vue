<script setup lang="ts">
import SectionLabel from '@/components/ui/SectionLabel.vue'
import { principles } from '@/content/company'

/** Principles, kept short and restrained. */
withDefaults(defineProps<{ index?: string }>(), { index: '08' })
</script>

<template>
  <section class="section" aria-labelledby="principles-title">
    <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-4">
        <SectionLabel :index="index" label="Principles" />
        <h2 id="principles-title" v-reveal="60" class="heading-xl mt-8">What we hold to.</h2>
      </div>
      <ol class="border-t border-edge/15 lg:col-span-8">
        <li
          v-for="(p, i) in principles"
          :key="p.title"
          v-reveal="i * 60"
          class="grid grid-cols-[2rem_1fr] gap-x-3 gap-y-1 border-b border-edge/10 py-6 sm:grid-cols-[3rem_minmax(0,1.2fr)_minmax(0,1fr)] sm:items-baseline sm:gap-6"
        >
          <span class="font-mono text-[0.6875rem] text-fg-subtle">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="text-xl font-semibold tracking-[-0.025em] text-fg sm:text-2xl">{{ p.title }}</h3>
          <p
            class="col-start-2 text-[0.9375rem] leading-relaxed sm:col-start-3"
            :class="i === principles.length - 1 ? 'serif text-xl text-fg italic' : 'text-fg-muted'"
          >
            {{ p.body }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>
