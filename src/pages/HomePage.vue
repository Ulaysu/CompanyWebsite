<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import HomeHero from '@/components/sections/HomeHero.vue'
import CompanySection from '@/components/sections/CompanySection.vue'
import WorkSection from '@/components/sections/WorkSection.vue'
import CapabilitiesSection from '@/components/sections/CapabilitiesSection.vue'
import AfricaWorldSection from '@/components/sections/AfricaWorldSection.vue'
import EngineeringSection from '@/components/sections/EngineeringSection.vue'
import PrinciplesSection from '@/components/sections/PrinciplesSection.vue'
import BuildWithUs from '@/components/sections/BuildWithUs.vue'

usePageMeta()
</script>

<template>
  <div>
    <HomeHero />
    <CompanySection />
    <WorkSection />
    <CapabilitiesSection />
    <AfricaWorldSection />
    <EngineeringSection />
    <PrinciplesSection />
    <BuildWithUs />
  </div>
</template>
