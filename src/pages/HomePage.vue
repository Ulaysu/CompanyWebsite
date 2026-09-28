<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import HomeHero from '@/components/sections/HomeHero.vue'
import PhilosophySection from '@/components/sections/PhilosophySection.vue'
import BuildSection from '@/components/sections/BuildSection.vue'
import WorkSection from '@/components/sections/WorkSection.vue'
import ProcessSection from '@/components/sections/ProcessSection.vue'
import EngineeringSection from '@/components/sections/EngineeringSection.vue'
import PartnerSection from '@/components/sections/PartnerSection.vue'
import FounderSection from '@/components/sections/FounderSection.vue'
import PrinciplesSection from '@/components/sections/PrinciplesSection.vue'
import FinalCta from '@/components/sections/FinalCta.vue'

usePageMeta()
</script>

<template>
  <div>
    <HomeHero />
    <PhilosophySection />
    <BuildSection />
    <WorkSection />
    <ProcessSection />
    <EngineeringSection />
    <PartnerSection />
    <FounderSection />
    <PrinciplesSection />
    <FinalCta />
  </div>
</template>
