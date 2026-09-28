<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import ImageBand from '@/components/sections/ImageBand.vue'
import ProcessSection from '@/components/sections/ProcessSection.vue'
import EngineeringSection from '@/components/sections/EngineeringSection.vue'
import PrinciplesSection from '@/components/sections/PrinciplesSection.vue'
import PartnerSection from '@/components/sections/PartnerSection.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import { whatWeBuild } from '@/content/company'

usePageMeta({
  title: 'Approach',
  description:
    'What SOFORR builds and how: products, platforms, systems and infrastructure, engineered for what happens after launch.',
})

/** Where each kind of building shows up in SOFORR's own work today. */
const inPractice: Record<string, { label: string; to: string } | undefined> = {
  products: { label: 'Kujaaburun', to: '/work/kujaaburun' },
  platforms: { label: 'Kujaaburun', to: '/work/kujaaburun' },
  systems: { label: 'SweetLand Farms OS', to: '/work/sweetland-farms-os' },
}
</script>

<template>
  <div>
    <PageHero
      label="Approach"
      title="How SOFORR builds technology."
      :lede="whatWeBuild.lede"
      photo="servers"
    />

    <section class="section !pt-20 sm:!pt-28" aria-labelledby="areas-title">
      <div class="container-page">
        <SectionLabel label="What we build" />
        <h2 id="areas-title" class="sr-only">What we build</h2>
        <article
          v-for="(a, i) in whatWeBuild.areas"
          :id="a.id"
          :key="a.id"
          class="grid scroll-mt-24 grid-cols-1 gap-8 border-t border-edge/10 py-14 first-of-type:mt-10 sm:py-20 lg:grid-cols-12 lg:gap-16"
        >
          <div v-reveal class="lg:col-span-5">
            <span class="font-mono text-xs text-fg-subtle">0{{ i + 1 }}</span>
            <h3 class="mt-4 text-5xl font-semibold tracking-[-0.045em] text-fg sm:text-7xl">{{ a.title }}</h3>
            <p class="mt-6 max-w-md text-xl leading-snug text-fg">{{ a.summary }}</p>
          </div>
          <div v-reveal="100" class="lg:col-span-6 lg:col-start-7 lg:pt-14">
            <p class="text-lg leading-relaxed text-fg-muted">{{ a.description }}</p>
            <ul class="mt-8 border-t border-edge/10">
              <li v-for="e in a.examples" :key="e" class="flex items-baseline gap-3 border-b border-edge/10 py-3 text-[0.9375rem] text-fg">
                <span class="size-1 shrink-0 translate-y-[-2px] bg-fg-subtle" aria-hidden="true" />{{ e }}
              </li>
            </ul>
            <p v-if="inPractice[a.id]" class="mt-6 font-mono text-xs text-fg-subtle">
              In practice:
              <RouterLink :to="inPractice[a.id]!.to" class="text-fg underline decoration-edge/25 underline-offset-4 hover:decoration-fg">{{ inPractice[a.id]!.label }}</RouterLink>
            </p>
          </div>
        </article>
      </div>
    </section>

    <ImageBand
      name="system"
      alt="Isometric model of a central system connected to payments, orders, inventory, CRM, documents and reporting modules."
      caption="Fig. 1 — One system at the centre, connected to everything an operation already uses."
    />

    <ProcessSection index="" />
    <EngineeringSection index="" />
    <PrinciplesSection index="" />
    <PartnerSection index="" />
    <FinalCta />
  </div>
</template>
