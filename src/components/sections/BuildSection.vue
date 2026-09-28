<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import { buildAreas } from '@/content/company'

withDefaults(defineProps<{ index?: string }>(), { index: '03' })
</script>

<template>
  <section class="section border-t border-edge/[0.07]" aria-labelledby="build-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p v-reveal class="index-label"><span class="text-accent">{{ index }}</span><span class="h-px w-6 bg-edge/20" aria-hidden="true" />What we build</p>
          <h2 id="build-title" v-reveal="60" class="display mt-8">We build technology.</h2>
        </div>
        <p v-reveal="120" class="lede lg:col-span-4 lg:col-start-9">
          Not projects for hire. Technology that does a real job in the world, in four forms.
        </p>
      </div>

      <ol class="mt-16 border-t border-edge/15 sm:mt-24">
        <li v-for="(a, i) in buildAreas" :key="a.id" v-reveal="i * 60" class="border-b border-edge/10">
          <RouterLink
            :to="`/what-we-build#${a.id}`"
            class="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 gap-y-3 py-8 outline-offset-4 sm:py-10 lg:grid-cols-[4rem_minmax(0,5fr)_minmax(0,6fr)_2rem] lg:gap-x-8"
          >
            <span class="font-mono text-xs text-fg-subtle transition-colors group-hover:text-accent">0{{ i + 1 }}</span>
            <h3 class="text-4xl font-semibold tracking-[-0.045em] text-fg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 sm:text-6xl lg:text-7xl">
              {{ a.title }}
            </h3>
            <ArrowUpRight class="size-5 self-center text-fg-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent lg:order-last" aria-hidden="true" />
            <div class="col-span-2 col-start-2 lg:col-span-1 lg:col-start-3 lg:row-start-1">
              <p class="max-w-md text-lg leading-snug text-fg">{{ a.summary }}</p>
              <p class="mt-3 font-mono text-[0.6875rem] tracking-wide text-fg-subtle">{{ a.examples.join(' · ') }}</p>
            </div>
          </RouterLink>
        </li>
      </ol>
    </div>
  </section>
</template>
