<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import ProjectFeature from '@/components/work/ProjectFeature.vue'
import MoreComing from '@/components/work/MoreComing.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import { ownProducts, projects } from '@/content/work'

usePageMeta({
  title: 'Products',
  description: 'SOFORR builds its own technology products, designed around real problems. Kujaaburun is the first, originating in The Gambia.',
})

const partnerCount = projects.length - ownProducts.length
</script>

<template>
  <div>
    <PageHero
      label="Products"
      title="We don’t just build technology for others. We build our own."
      lede="SOFORR’s own products, designed around problems we understand closely. Each is shown with its real status."
    />

    <section class="section !pt-20 sm:!pt-28" aria-label="Our products">
      <div class="container-page">
        <div class="space-y-24 sm:space-y-32">
          <ProjectFeature v-for="(p, i) in ownProducts" :key="p.slug" :project="p" :index="i" />
        </div>
        <MoreComing class="mt-24 sm:mt-32" :next-index="ownProducts.length + 1" />
        <p v-if="partnerCount" v-reveal class="mt-12 max-w-2xl text-[0.9375rem] leading-relaxed text-fg-muted">
          We also build systems with partners.
          <RouterLink to="/work" class="text-fg underline decoration-edge/30 underline-offset-4 hover:decoration-fg">See all of our work</RouterLink>.
        </p>
      </div>
    </section>

    <FinalCta />
  </div>
</template>
