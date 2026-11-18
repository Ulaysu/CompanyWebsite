<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import ProductFeature from '@/components/product/ProductFeature.vue'
import { ownedProducts } from '@/content/products'

/** SOFORR's own products, flagship first. */
withDefaults(defineProps<{ index?: string }>(), { index: '' })
</script>

<template>
  <section class="section" aria-labelledby="featured-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
        <h2 id="featured-title" class="heading-xl lg:col-span-7">Software we own, build and operate ourselves.</h2>
        <p class="lede lg:col-span-4 lg:col-start-9">Independently owned products, shown with their real status.</p>
      </div>
      <div class="mt-14 space-y-20 sm:space-y-28">
        <ProductFeature v-for="(p, i) in ownedProducts" :key="p.slug" :product="p" :flip="i % 2 === 1" />
      </div>
      <div class="mt-14"><AppButton to="/products" variant="secondary" arrow>All products</AppButton></div>
    </div>
  </section>
</template>
