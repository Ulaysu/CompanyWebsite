<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import HeroSection from '@/components/sections/HeroSection.vue'
import DomainStrip from '@/components/sections/DomainStrip.vue'
import ProblemSection from '@/components/sections/ProblemSection.vue'
import ServicesOverview from '@/components/sections/ServicesOverview.vue'
import SolutionsShowcase from '@/components/sections/SolutionsShowcase.vue'
import DifferentiatorSection from '@/components/sections/DifferentiatorSection.vue'
import ProcessOverview from '@/components/sections/ProcessOverview.vue'
import ProblemsWorthSolving from '@/components/sections/ProblemsWorthSolving.vue'
import TechnologySection from '@/components/sections/TechnologySection.vue'
import FinalCta from '@/components/sections/FinalCta.vue'

usePageMeta({
  description:
    'Turn messy business processes into software that works. Custom internal systems, automation, APIs, and operational software that reduce manual work, improve visibility, and keep revenue moving.',
})
</script>

<template>
  <div>
    <HeroSection />
    <DomainStrip />
    <ProblemSection />
    <ServicesOverview />
    <SolutionsShowcase />
    <DifferentiatorSection />
    <ProcessOverview />
    <ProblemsWorthSolving />
    <TechnologySection />
    <FinalCta />
  </div>
</template>
