<script setup lang="ts">
import SectionLabel from '@/components/ui/SectionLabel.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ProductFeature from '@/components/product/ProductFeature.vue'
import { ownedProducts } from '@/content/products'

/** SOFORR's own products, flagship first. */
withDefaults(defineProps<{ index?: string }>(), { index: '03' })
</script>

<template>
  <section class="section border-t border-edge/[0.07]" aria-labelledby="featured-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <SectionLabel :index="index" label="Featured products" />
          <h2 id="featured-title" v-reveal="60" class="heading-xl mt-8">Software we own and build ourselves.</h2>
        </div>
        <p v-reveal="120" class="lede lg:col-span-4 lg:col-start-9">
          Independently owned products, developed by SOFORR. Each is shown with its real status.
        </p>
      </div>

      <div class="mt-16 space-y-24 sm:mt-24 sm:space-y-32">
        <ProductFeature v-for="(p, i) in ownedProducts" :key="p.slug" :product="p" :flip="i % 2 === 1" />
      </div>
      <div v-reveal class="mt-16">
        <AppButton to="/products" variant="secondary" arrow>All products</AppButton>
      </div>
    </div>
  </section>
</template>
