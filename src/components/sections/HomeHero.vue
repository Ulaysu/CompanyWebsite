<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'
import LocalTime from '@/components/ui/LocalTime.vue'
import { site } from '@/config/site'
import { projects } from '@/content/work'
import { photoSrc, photos } from '@/content/photos'
import { globe } from '@/content/images'

/** The headline, word by word. The last two words are set in the serif. */
const words = [
  ...'We build technology for ideas'.split(' ').map((w) => ({ w, serif: false })),
  ...'worth building.'.split(' ').map((w) => ({ w, serif: true })),
]
</script>

<template>
  <section class="surface-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
    <div aria-hidden="true" class="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_90%_70%_at_30%_30%,#000_10%,transparent_80%)]" />

    <!-- The globe: Africa at the centre, arcs travelling from The Gambia to the rest of the world. -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute top-[-4%] left-1/2 -z-10 w-[150vw] max-w-none -translate-x-1/2 animate-fade-up opacity-45 [animation-delay:300ms] sm:top-[-10%] sm:w-[105vw] sm:opacity-55 lg:top-[44%] lg:right-[-11vw] lg:left-auto lg:w-[60vw] lg:max-w-[66rem] lg:translate-x-0 lg:-translate-y-1/2 lg:opacity-100"
    >
      <img
        :src="globe.src"
        :srcset="globe.srcset"
        sizes="(min-width: 1024px) 62vw, 150vw"
        :width="globe.size"
        :height="globe.size"
        fetchpriority="high"
        decoding="async"
        alt=""
        class="block h-auto w-full animate-drift"
      />
    </div>
    <!-- Legibility: darken where the text sits. -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(10_10_10/0.2)_0%,rgb(10_10_10/0.6)_50%,#0a0a0a_100%)] lg:bg-[linear-gradient(90deg,#0a0a0a_0%,rgb(10_10_10/0.85)_28%,rgb(10_10_10/0.1)_55%,transparent_100%),linear-gradient(180deg,transparent_70%,#0a0a0a_96%)]" />

    <div class="container-page relative flex flex-1 flex-col pt-28 pb-8 sm:pt-36 lg:pb-10">
      <div class="lg:max-w-[58%]">
        <p class="index-label animate-fade-up">
          <span class="text-fg">{{ site.name }}</span><span class="text-fg-subtle/60" aria-hidden="true">/</span>{{ site.descriptor }}
        </p>

        <h1 id="hero-title" class="mt-8 text-[3.25rem] leading-[0.95] font-semibold tracking-[-0.05em] text-fg sm:mt-10 sm:text-[5.5rem] lg:text-[5.25rem] xl:text-[6.25rem]">
          <template v-for="(item, i) in words" :key="i">
            <span class="word-line"><span :class="item.serif ? 'serif font-normal tracking-[-0.03em] italic' : ''" :style="{ '--word-delay': `${120 + i * 70}ms` }">{{ item.w }}</span></span>{{ i < words.length - 1 ? ' ' : '' }}
          </template>
        </h1>

        <p class="mt-10 max-w-lg animate-fade-up text-lg leading-relaxed text-fg-muted [animation-delay:700ms] sm:text-xl">{{ site.summary }}</p>
        <div class="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:780ms] sm:flex-row">
          <AppButton to="/work" size="lg" arrow>See the work</AppButton>
          <AppButton to="/contact" variant="secondary" size="lg">Start a conversation</AppButton>
        </div>
      </div>

      <!-- Evidence: what we're building, and where. -->
      <div class="mt-auto pt-16 lg:pt-20">
        <div class="grid animate-fade-up grid-cols-1 gap-x-8 border-t border-edge/15 [animation-delay:900ms] md:grid-cols-[auto_1fr_1fr] md:items-center">
          <p class="eyebrow flex items-center gap-2 pt-5 pb-1 md:py-0 md:pr-4">
            <span class="relative flex size-1.5" aria-hidden="true"><span class="absolute inset-0 animate-pulse-dot rounded-full bg-accent" /></span>
            Now building
          </p>
          <RouterLink
            v-for="p in projects"
            :key="p.slug"
            :to="`/work/${p.slug}`"
            class="group grid grid-cols-[4rem_1fr_auto] items-center gap-4 border-b border-edge/15 py-4 md:border-b-0 md:border-l md:pl-8"
          >
            <span class="relative block aspect-[4/3] overflow-hidden bg-ink-900">
              <img
                :src="photoSrc(p.photo)"
                alt=""
                width="800"
                height="600"
                decoding="async"
                class="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:grayscale-0"
                :style="{ objectPosition: photos[p.photo]!.position }"
              />
            </span>
            <span class="min-w-0">
              <span class="block truncate text-base font-semibold tracking-[-0.01em] text-fg">{{ p.name }}</span>
              <span class="mt-1 block truncate font-mono text-[0.6875rem] tracking-wide text-fg-subtle">{{ p.place.name }} · <LocalTime :time-zone="p.place.timeZone" /></span>
            </span>
            <ArrowUpRight class="size-4 text-fg-subtle transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden="true" />
          </RouterLink>
        </div>

        <div class="flex animate-fade-up items-center justify-between gap-6 border-t border-edge/10 pt-5 font-mono text-[0.6875rem] tracking-wide text-fg-subtle [animation-delay:1000ms]">
          <p>{{ site.origin }}</p>
          <p class="hidden sm:block">Products · Platforms · Systems · Infrastructure</p>
        </div>
      </div>
    </div>
  </section>
</template>
