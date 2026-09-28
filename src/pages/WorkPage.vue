<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import WorkSection from '@/components/sections/WorkSection.vue'
import PartnerSection from '@/components/sections/PartnerSection.vue'
import FinalCta from '@/components/sections/FinalCta.vue'

usePageMeta({
  title: 'Work',
  description:
    'SOFORR builds wherever the problem is: Kujaaburun, a travel platform originating in The Gambia, and SweetLand Farms OS, an operational system for a farm in Maine, USA.',
})
</script>

<template>
  <div>
    <WorkSection index="" heading-level="h1" class="pt-16" />
    <PartnerSection index="" />
    <FinalCta />
  </div>
</template>
