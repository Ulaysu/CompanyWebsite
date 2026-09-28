<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import HomeHero from '@/components/sections/HomeHero.vue'
import BeliefSection from '@/components/sections/BeliefSection.vue'
import VisionSection from '@/components/sections/VisionSection.vue'
import BuildSection from '@/components/sections/BuildSection.vue'
import ProductsSection from '@/components/sections/ProductsSection.vue'
import AfricaWorldSection from '@/components/sections/AfricaWorldSection.vue'
import HowWeBuildSection from '@/components/sections/HowWeBuildSection.vue'
import PartnershipSection from '@/components/sections/PartnershipSection.vue'
import FounderSection from '@/components/sections/FounderSection.vue'
import FinalCta from '@/components/sections/FinalCta.vue'

usePageMeta()
</script>

<template>
  <div>
    <HomeHero />
    <BeliefSection />
    <VisionSection />
    <BuildSection />
    <ProductsSection />
    <AfricaWorldSection />
    <HowWeBuildSection />
    <PartnershipSection />
    <FounderSection />
    <FinalCta />
  </div>
</template>
