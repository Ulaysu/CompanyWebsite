<script setup lang="ts">
import type { Product } from '@/content/products'
import { photoSrc, photoSrcset, photos } from '@/content/photos'
import BusinessOsDiagram from '@/components/product/BusinessOsDiagram.vue'

/** A product's visual: its real photograph if it has one, otherwise a clearly labelled concept diagram. */
defineProps<{ product: Product; sizes?: string; eager?: boolean }>()
</script>

<template>
  <div class="card relative aspect-[4/3] overflow-hidden">
    <img
      v-if="product.photo"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      :alt="photos[product.photo]!.alt"
      :sizes="sizes ?? '(min-width: 1024px) 58vw, 100vw'"
      :srcset="photoSrcset(product.photo)"
      :src="photoSrc(product.photo)"
      class="absolute inset-0 h-full w-full object-cover"
      :style="{ objectPosition: photos[product.photo]!.position }"
    />
    <div v-else-if="product.diagram === 'business-os'" class="absolute inset-0 bg-ink-900 p-6 sm:p-10"><BusinessOsDiagram /></div>
    <div v-else class="absolute inset-0 bg-ink-900" />
  </div>
</template>
