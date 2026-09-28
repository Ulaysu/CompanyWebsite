<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import LocalTime from '@/components/ui/LocalTime.vue'
import PhilosophySection from '@/components/sections/PhilosophySection.vue'
import FounderSection from '@/components/sections/FounderSection.vue'
import PrinciplesSection from '@/components/sections/PrinciplesSection.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { direction, founder } from '@/content/company'
import { projects } from '@/content/work'
import { site } from '@/config/site'

usePageMeta({
  title: 'About',
  description: `${site.name} is a technology company founded in The Gambia by ${founder.name} (${founder.handle}). It builds products, platforms and systems wherever the problem is.`,
})
</script>

<template>
  <div>
    <PageHero
      label="About"
      title="A technology company named after an idea."
      :lede="`SOFORR was founded in The Gambia by ${founder.name}, known as ${founder.handle}. It builds products, platforms and systems for people and organisations, wherever the problem is.`"
      photo="builders"
    />

    <PhilosophySection index="" />

    <!-- Origin and scope, stated once. -->
    <section class="section border-t border-edge/[0.07]" aria-labelledby="origin-title">
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <SectionLabel label="Origin & scope" />
          <h2 id="origin-title" v-reveal="60" class="heading-xl mt-8">
            Founded in The Gambia.<br /><span class="text-fg-muted">Building globally.</span>
          </h2>
        </div>
        <div class="lg:col-span-6 lg:col-start-7">
          <p v-reveal class="text-xl leading-relaxed text-fg">
            The Gambia is where SOFORR started, and where its philosophy comes from. It is not the limit of what the
            company builds or who it builds for.
          </p>
          <p v-reveal="60" class="mt-5 text-lg leading-relaxed text-fg-muted">
            Today the work spans a travel platform originating in The Gambia and an operational system for a farm in
            Maine. Different industries and environments, held to the same engineering standard.
          </p>
          <ul class="mt-10 border-t border-edge/15">
            <li v-for="p in projects" :key="p.slug" v-reveal class="border-b border-edge/10">
              <RouterLink :to="`/work/${p.slug}`" class="group grid grid-cols-[1fr_auto] items-baseline gap-4 py-5">
                <span>
                  <span class="block text-xl font-semibold tracking-[-0.02em] text-fg">{{ p.place.name }}</span>
                  <span class="mt-1 block text-[0.9375rem] text-fg-muted group-hover:text-fg">{{ p.name }} · {{ p.kind }}</span>
                </span>
                <span class="font-mono text-[0.6875rem] text-fg-subtle"><LocalTime :time-zone="p.place.timeZone" /></span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <FounderSection index="" />
    <PrinciplesSection index="" />

    <section class="section border-t border-edge/[0.07]" aria-labelledby="direction-title">
      <div class="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <SectionLabel label="Direction" />
          <h2 id="direction-title" v-reveal="60" class="heading-xl mt-8">{{ direction.title }}</h2>
        </div>
        <div class="lg:col-span-6 lg:col-start-7 lg:pt-16">
          <p v-reveal class="text-xl leading-relaxed text-fg sm:text-2xl sm:leading-relaxed">{{ direction.body }}</p>
          <div v-reveal="80" class="mt-10">
            <AppButton to="/work" variant="secondary" arrow>See the work</AppButton>
          </div>
        </div>
      </div>
    </section>

    <FinalCta />
  </div>
</template>
