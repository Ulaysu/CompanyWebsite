<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import ImageBand from '@/components/sections/ImageBand.vue'
import HowWeBuildSection from '@/components/sections/HowWeBuildSection.vue'
import PartnershipSection from '@/components/sections/PartnershipSection.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import { buildAreas } from '@/content/company'

usePageMeta({
  title: 'What we build',
  description:
    'SOFORR builds products, platforms, systems and infrastructure: technology designed to solve real problems and engineered to last.',
})

/** Where each kind of building shows up in SOFORR's own work today. */
const inPractice: Record<string, { label: string; to: string } | undefined> = {
  products: { label: 'Kujaaburun', to: '/products/kujaaburun' },
  platforms: { label: 'Kujaaburun', to: '/products/kujaaburun' },
  systems: { label: 'SweetLand Farms', to: '/products/sweetland-farms' },
}
</script>

<template>
  <div>
    <PageHero
      label="What we build"
      title="We build technology that does a real job."
      lede="Products, platforms, systems and the infrastructure underneath them. Some we build for ourselves, some with selected partners. All of it to the same standard."
      photo="servers"
    />

    <section class="section !pt-16 sm:!pt-24" aria-label="What we build">
      <div class="container-page">
        <article
          v-for="(a, i) in buildAreas"
          :id="a.id"
          :key="a.id"
          class="grid scroll-mt-24 grid-cols-1 gap-8 border-t border-edge/10 py-14 first:border-t-0 first:pt-0 sm:py-20 lg:grid-cols-12 lg:gap-16"
        >
          <div v-reveal class="lg:col-span-5">
            <span class="font-mono text-xs text-accent">0{{ i + 1 }}</span>
            <h2 class="mt-4 text-5xl font-semibold tracking-[-0.045em] text-fg sm:text-7xl">{{ a.title }}</h2>
            <p class="mt-6 max-w-md text-xl leading-snug text-fg">{{ a.summary }}</p>
          </div>
          <div v-reveal="100" class="lg:col-span-6 lg:col-start-7 lg:pt-14">
            <p class="text-lg leading-relaxed text-fg-muted">{{ a.description }}</p>
            <ul class="mt-8 border-t border-edge/10">
              <li v-for="e in a.examples" :key="e" class="flex items-baseline gap-3 border-b border-edge/10 py-3 text-[0.9375rem] text-fg">
                <span class="size-1 shrink-0 translate-y-[-2px] bg-accent" aria-hidden="true" />{{ e }}
              </li>
            </ul>
            <p v-if="inPractice[a.id]" class="mt-6 font-mono text-xs text-fg-subtle">
              In practice:
              <RouterLink :to="inPractice[a.id]!.to" class="text-fg underline decoration-edge/25 underline-offset-4 hover:decoration-accent">{{ inPractice[a.id]!.label }}</RouterLink>
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

    <HowWeBuildSection index="" />
    <PartnershipSection index="" />
    <FinalCta />
  </div>
</template>
