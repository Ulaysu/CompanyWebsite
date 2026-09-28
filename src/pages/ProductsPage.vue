<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import ProductsSection from '@/components/sections/ProductsSection.vue'
import FinalCta from '@/components/sections/FinalCta.vue'

usePageMeta({
  title: 'Products',
  description:
    'The products and technology initiatives SOFORR is building: Kujaaburun, a platform connecting travellers, guides and tourism opportunities across Africa, and SweetLand Farms.',
})
</script>

<template>
  <div>
    <ProductsSection index="" heading-level="h1" class="pt-16" />
    <FinalCta />
  </div>
</template>
