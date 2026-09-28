<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import BeliefSection from '@/components/sections/BeliefSection.vue'
import VisionSection from '@/components/sections/VisionSection.vue'
import AfricaWorldSection from '@/components/sections/AfricaWorldSection.vue'
import FounderSection from '@/components/sections/FounderSection.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { direction, founder, principles } from '@/content/company'
import { site } from '@/config/site'

usePageMeta({
  title: 'About',
  description: `${site.name} is a technology company founded in The Gambia by ${founder.name} (${founder.handle}), building world-class technology from Africa to the world.`,
})
</script>

<template>
  <div>
    <PageHero
      label="About SOFORR"
      title="A technology company built on helping one another."
      :lede="`SOFORR was founded in The Gambia by ${founder.name}, known online as ${founder.handle}. We build products, platforms, systems and infrastructure, from Africa to the world.`"
      photo="city"
    />

    <BeliefSection index="" />
    <VisionSection index="" label="Why we exist" />
    <AfricaWorldSection index="" />

    <section class="section" aria-labelledby="principles-title">
      <div class="container-page">
        <p v-reveal class="index-label"><span class="h-px w-6 bg-accent" aria-hidden="true" />How we think</p>
        <h2 id="principles-title" v-reveal="60" class="heading-xl mt-8">Principles we build by.</h2>
        <ol class="mt-14 grid grid-cols-1 gap-x-16 gap-y-12 sm:mt-20 md:grid-cols-2">
          <li v-for="(p, i) in principles" :key="p.title" v-reveal="(i % 2) * 90" class="border-t border-edge/10 pt-8">
            <span class="font-mono text-xs text-accent">0{{ i + 1 }}</span>
            <h3 class="mt-5 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">{{ p.title }}</h3>
            <p class="mt-4 max-w-md text-lg leading-relaxed text-fg-muted">{{ p.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <FounderSection index="" />

    <section class="section" aria-labelledby="direction-title">
      <div class="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <p v-reveal class="index-label"><span class="h-px w-6 bg-accent" aria-hidden="true" />Direction</p>
          <h2 id="direction-title" v-reveal="60" class="heading-xl mt-8">{{ direction.title }}</h2>
        </div>
        <div class="lg:col-span-6 lg:col-start-7 lg:pt-16">
          <p v-reveal class="text-xl leading-relaxed text-fg sm:text-2xl sm:leading-relaxed">{{ direction.body }}</p>
          <div v-reveal="80" class="mt-10">
            <AppButton to="/products" variant="secondary" arrow>See what we’re building</AppButton>
          </div>
        </div>
      </div>
    </section>

    <FinalCta />
  </div>
</template>
