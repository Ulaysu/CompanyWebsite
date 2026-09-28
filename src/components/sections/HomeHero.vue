<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'
import LocalTime from '@/components/ui/LocalTime.vue'
import { site } from '@/config/site'
import { projects } from '@/content/work'
import { photoSrc, photos } from '@/content/photos'

/** The headline, word by word. The last two words are set in the serif. */
const words = [
  ...'We build technology for ideas'.split(' ').map((w) => ({ w, serif: false })),
  ...'worth building.'.split(' ').map((w) => ({ w, serif: true })),
]
</script>

<template>
  <section class="surface-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
    <div aria-hidden="true" class="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_90%_70%_at_30%_30%,#000_10%,transparent_80%)]" />

    <div class="container-page relative flex flex-1 flex-col pt-28 pb-8 sm:pt-36 lg:pb-10">
      <p class="index-label animate-fade-up">
        <span class="text-fg">{{ site.name }}</span><span class="text-fg-subtle/60" aria-hidden="true">/</span>{{ site.descriptor }}
      </p>

      <h1 id="hero-title" class="mt-8 max-w-[15ch] text-[3.25rem] leading-[0.95] font-semibold tracking-[-0.05em] text-fg sm:mt-10 sm:text-[5.5rem] lg:text-[7rem] xl:text-[7.75rem]">
        <template v-for="(item, i) in words" :key="i">
          <span class="word-line"><span :class="item.serif ? 'serif font-normal tracking-[-0.03em] italic' : ''" :style="{ '--word-delay': `${120 + i * 70}ms` }">{{ item.w }}</span></span>{{ i < words.length - 1 ? ' ' : '' }}
        </template>
      </h1>

      <div class="mt-auto grid grid-cols-1 gap-12 pt-14 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pt-20">
        <div class="animate-fade-up [animation-delay:700ms] lg:col-span-6">
          <p class="max-w-lg text-lg leading-relaxed text-fg-muted sm:text-xl">{{ site.summary }}</p>
          <div class="mt-9 flex flex-col gap-3 sm:flex-row">
            <AppButton to="/work" size="lg" arrow>See the work</AppButton>
            <AppButton to="/contact" variant="secondary" size="lg">Start a conversation</AppButton>
          </div>
        </div>

        <!-- Evidence: what we're building, and where. -->
        <div class="animate-fade-up [animation-delay:850ms] lg:col-span-5 lg:col-start-8">
          <p class="eyebrow flex items-center gap-2">
            <span class="relative flex size-1.5" aria-hidden="true"><span class="absolute inset-0 animate-pulse-dot rounded-full bg-accent" /></span>
            Now building
          </p>
          <ul class="mt-4 border-t border-edge/15">
            <li v-for="p in projects" :key="p.slug" class="border-b border-edge/15">
              <RouterLink :to="`/work/${p.slug}`" class="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-4 sm:grid-cols-[5.5rem_1fr_auto]">
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
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 flex animate-fade-up items-center justify-between gap-6 border-t border-edge/10 pt-5 font-mono text-[0.6875rem] tracking-wide text-fg-subtle [animation-delay:1000ms] lg:mt-16">
        <p>{{ site.origin }}</p>
        <p class="hidden sm:block">Products · Platforms · Systems · Infrastructure</p>
      </div>
    </div>
  </section>
</template>
