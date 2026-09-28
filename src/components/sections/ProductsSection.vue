<script setup lang="ts">
import ProductFeature from '@/components/products/ProductFeature.vue'
import MoreComing from '@/components/products/MoreComing.vue'
import { products } from '@/content/products'

withDefaults(defineProps<{ index?: string; headingLevel?: 'h1' | 'h2' }>(), { index: '04', headingLevel: 'h2' })
</script>

<template>
  <section class="surface-dark relative overflow-hidden" aria-labelledby="products-title">
    <div class="container-page section">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-8">
          <p v-reveal class="index-label"><span v-if="index" class="text-accent">{{ index }}</span><span class="h-px w-6 bg-edge/20" aria-hidden="true" />Products</p>
          <component :is="headingLevel" id="products-title" v-reveal="60" class="display mt-8">
            We don’t just build technology for others.
            <span class="text-fg-subtle">We build our own.</span>
          </component>
        </div>
        <p v-reveal="120" class="lede lg:col-span-4">
          Products and initiatives SOFORR is building now. Each is shown with its real status: no borrowed metrics,
          no invented traction.
        </p>
      </div>

      <div class="mt-20 space-y-24 sm:mt-28 sm:space-y-32">
        <ProductFeature v-for="(p, i) in products" :key="p.slug" :product="p" :index="i" :flip="i % 2 === 1" />
      </div>

      <MoreComing class="mt-24 sm:mt-32" :next-index="products.length + 1" />
    </div>
  </section>
</template>
