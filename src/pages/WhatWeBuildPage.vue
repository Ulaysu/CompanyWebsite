<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ImageBand from '@/components/sections/ImageBand.vue'
import EngineeringSection from '@/components/sections/EngineeringSection.vue'
import BuildWithUs from '@/components/sections/BuildWithUs.vue'
import { capabilities, engagement, softwareBelief } from '@/content/company'

usePageMeta({
  title: 'What we build',
  description:
    'Digital products, business systems, APIs and integrations, and automation: engineered to run in the real world and built to last.',
})
</script>

<template>
  <div>
    <PageHero
      label="What we build"
      title="Products, platforms and the systems behind them."
      :lede="softwareBelief"
      photo="servers"
    />

    <section class="section !pt-16 sm:!pt-24" aria-label="Capabilities">
      <div class="container-page">
        <article
          v-for="(c, i) in capabilities"
          :id="c.id"
          :key="c.id"
          class="grid grid-cols-1 gap-8 border-t border-edge/[0.08] py-14 first:border-t-0 first:pt-0 sm:py-20 lg:grid-cols-12 lg:gap-16"
        >
          <div v-reveal class="lg:col-span-5">
            <div class="flex items-center gap-4">
              <span class="grid size-11 place-items-center rounded-xl border border-edge/10 bg-ink-900">
                <component :is="c.icon" class="size-5 text-signal" aria-hidden="true" />
              </span>
              <span class="font-mono text-xs text-fg-subtle">0{{ i + 1 }}</span>
            </div>
            <h2 class="heading-xl text-gradient mt-8">{{ c.title }}</h2>
            <p class="mt-4 text-lg text-fg">{{ c.summary }}</p>
          </div>
          <div v-reveal="100" class="lg:col-span-6 lg:col-start-7 lg:pt-20">
            <p class="text-lg leading-relaxed text-fg-muted">{{ c.description }}</p>
            <ul class="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              <li v-for="e in c.examples" :key="e" class="flex items-center gap-3 border-b border-edge/[0.08] py-3 text-[0.9375rem] text-fg">
                <span class="size-1 rounded-full bg-signal" aria-hidden="true" />{{ e }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <ImageBand
      name="system"
      alt="Isometric model of a central system connected to payments, orders, inventory, CRM, documents and reporting modules."
      caption="One system at the centre, connected to everything a business already uses."
    />

    <section class="section" aria-labelledby="engagement-title">
      <div class="container-page">
        <SectionHeader
          label="Working together"
          title="From idea to production, and beyond."
          lede="Whether it’s our product or yours, the rhythm is the same: understand deeply, ship early, keep improving."
          heading-id="engagement-title"
        />
        <ol class="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-edge/[0.07] bg-edge/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(step, i) in engagement" :key="step.title" v-reveal="i * 80" class="bg-ink-950 p-7 sm:p-8">
            <span class="font-mono text-xs text-accent">0{{ i + 1 }}</span>
            <h3 class="mt-8 text-xl font-semibold tracking-[-0.02em] text-fg">{{ step.title }}</h3>
            <p class="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">{{ step.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <div class="border-t border-edge/[0.06]">
      <EngineeringSection index="" />
    </div>

    <BuildWithUs />
  </div>
</template>
