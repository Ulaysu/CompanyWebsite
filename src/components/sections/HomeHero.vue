<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'
import { site } from '@/config/site'
import { divisions } from '@/content/company'
import { globe } from '@/content/images'

/** The headline, word by word. The last three words are set in the serif. */
const words = [
  ...'Engineering software. Building'.split(' ').map((w) => ({ w, serif: false })),
  ...'what comes next.'.split(' ').map((w) => ({ w, serif: true })),
]
</script>

<template>
  <section class="surface-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
    <div aria-hidden="true" class="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_90%_70%_at_30%_30%,#000_10%,transparent_80%)]" />

    <!-- The globe: Africa at the centre, arcs travelling from The Gambia to the rest of the world. -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute top-[-4%] left-1/2 -z-10 w-[150vw] max-w-none -translate-x-1/2 animate-fade-up opacity-75 [animation-delay:300ms] sm:top-[-10%] sm:w-[105vw] sm:opacity-80 lg:top-[44%] lg:right-[-11vw] lg:left-auto lg:w-[60vw] lg:max-w-[66rem] lg:translate-x-0 lg:-translate-y-1/2 lg:opacity-100"
    >
      <img
        :src="globe.src"
        :srcset="globe.srcset"
        sizes="(min-width: 1024px) 60vw, 150vw"
        :width="globe.size"
        :height="globe.size"
        fetchpriority="high"
        decoding="async"
        alt=""
        class="block h-auto w-full"
      />
    </div>
    <!-- Legibility: darken where the text sits. -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(10_10_10/0.1)_0%,rgb(10_10_10/0.45)_45%,#0a0a0a_92%)] lg:bg-[linear-gradient(90deg,#0a0a0a_0%,rgb(10_10_10/0.8)_26%,transparent_50%),linear-gradient(180deg,transparent_78%,#0a0a0a_98%)]" />

    <div class="container-page relative flex flex-1 flex-col pt-28 pb-8 sm:pt-36 lg:pb-10">
      <div class="lg:max-w-[58%]">
        <p class="index-label animate-fade-up">
          <span class="text-fg">{{ site.name }}</span><span class="text-fg-subtle/60" aria-hidden="true">/</span>{{ site.descriptor }}
        </p>

        <h1 id="hero-title" class="mt-8 text-[3rem] leading-[0.95] font-semibold tracking-[-0.05em] text-fg sm:mt-10 sm:text-[5rem] lg:text-[4.75rem] xl:text-[5.75rem]">
          <template v-for="(item, i) in words" :key="i">
            <span class="word-line"><span :class="item.serif ? 'serif font-normal tracking-[-0.03em] italic' : ''" :style="{ '--word-delay': `${120 + i * 70}ms` }">{{ item.w }}</span></span>{{ i < words.length - 1 ? ' ' : '' }}
          </template>
        </h1>

        <div class="mt-10 max-w-xl animate-fade-up space-y-4 text-lg leading-relaxed text-fg-muted [animation-delay:700ms] sm:text-xl">
          <p v-for="line in site.summary" :key="line">{{ line }}</p>
        </div>
        <div class="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:780ms] sm:flex-row">
          <AppButton to="/contact" size="lg" arrow>Discuss a project</AppButton>
          <AppButton to="/products" variant="secondary" size="lg">Explore our products</AppButton>
        </div>
      </div>

      <!-- The two divisions, with equal weight. -->
      <div class="mt-auto pt-16 lg:pt-20">
        <div class="grid animate-fade-up grid-cols-1 border-t border-edge/15 [animation-delay:900ms] md:grid-cols-2">
          <RouterLink
            v-for="(d, i) in divisions"
            :key="d.id"
            :to="d.cta.to"
            class="group flex items-center justify-between gap-6 border-b border-edge/15 py-5 md:border-b-0 md:py-6"
            :class="i === 0 ? 'md:pr-8' : 'md:border-l md:border-edge/15 md:pl-8'"
          >
            <span class="min-w-0">
              <span class="font-mono text-[0.6875rem] tracking-[0.16em] text-fg-subtle uppercase">{{ d.index }} / Division</span>
              <span class="mt-1.5 block text-xl font-semibold tracking-[-0.02em] text-fg">{{ d.title }}</span>
              <span class="mt-1 block text-sm text-fg-muted">{{ d.summary }}</span>
            </span>
            <ArrowUpRight class="size-5 shrink-0 text-fg-subtle transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden="true" />
          </RouterLink>
        </div>

        <div class="flex animate-fade-up items-center justify-between gap-6 border-t border-edge/10 pt-5 font-mono text-[0.6875rem] tracking-wide text-fg-subtle [animation-delay:1000ms]">
          <p>{{ site.origin }}</p>
          <p class="hidden sm:block">Engineering services · Software products</p>
        </div>
      </div>
    </div>
  </section>
</template>
