<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import { services } from '@/content/company'

/** Engineering capabilities, linking into the full services page. */
withDefaults(defineProps<{ index?: string }>(), { index: '02' })
</script>

<template>
  <section class="section border-t border-edge/[0.07]" aria-labelledby="services-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <SectionLabel :index="index" label="Engineering capabilities" />
          <h2 id="services-title" v-reveal="60" class="heading-xl mt-8">Specialised engineering, for businesses worldwide.</h2>
        </div>
        <p v-reveal="120" class="lede lg:col-span-4 lg:col-start-9">
          Six service lines, each delivered by engineers who own the outcome.
        </p>
      </div>

      <ol class="mt-16 border-t border-edge/15 sm:mt-24">
        <li v-for="(s, i) in services" :key="s.id" v-reveal="(i % 3) * 60" class="border-b border-edge/10">
          <RouterLink
            :to="`/engineering#${s.id}`"
            class="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 gap-y-2 py-6 outline-offset-4 sm:py-8 lg:grid-cols-[4rem_minmax(0,6fr)_minmax(0,6fr)_2rem] lg:gap-x-8"
          >
            <span class="font-mono text-xs text-fg-subtle">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="text-2xl font-semibold tracking-[-0.035em] text-fg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 sm:text-4xl">{{ s.title }}</h3>
            <ArrowUpRight class="size-5 self-center text-fg-subtle transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg lg:order-last" aria-hidden="true" />
            <p class="col-span-2 col-start-2 text-base leading-snug text-fg-muted lg:col-span-1 lg:col-start-3 lg:row-start-1">{{ s.summary }}</p>
          </RouterLink>
        </li>
      </ol>
    </div>
  </section>
</template>
