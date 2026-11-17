<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import HomeHero from '@/components/sections/HomeHero.vue'
import DivisionsSection from '@/components/sections/DivisionsSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection.vue'
import MethodologySection from '@/components/sections/MethodologySection.vue'
import PrinciplesSection from '@/components/sections/PrinciplesSection.vue'
import SelectedWorkSection from '@/components/sections/SelectedWorkSection.vue'
import GlobalSection from '@/components/sections/GlobalSection.vue'
import FounderSection from '@/components/sections/FounderSection.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import { site } from '@/config/site'

usePageMeta({ description: site.description })
</script>

<template>
  <div>
    <HomeHero />
    <DivisionsSection />
    <ServicesSection />
    <FeaturedProductsSection />
    <MethodologySection />
    <PrinciplesSection />
    <SelectedWorkSection />
    <GlobalSection />
    <FounderSection />
    <FinalCta />
  </div>
</template>
