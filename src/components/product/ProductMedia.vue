<script setup lang="ts">
import type { Product } from '@/content/products'
import { photoSrc, photoSrcset, photos } from '@/content/photos'
import ThemedImage from '@/components/ui/ThemedImage.vue'

/**
 * The visual for a product: its photograph if it has one, otherwise a clearly
 * labelled technical illustration. Real screenshots are shown separately.
 */
defineProps<{ product: Product; sizes?: string; eager?: boolean }>()
</script>

<template>
  <div class="relative aspect-[4/3] overflow-hidden bg-ink-900">
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
    <div v-else-if="product.illustration" class="absolute inset-0 grid place-items-center">
      <ThemedImage
        :name="product.illustration.name"
        :alt="product.illustration.alt"
        :sizes="sizes ?? '(min-width: 1024px) 58vw, 100vw'"
        :eager="eager"
        img-class="block h-full w-full object-cover"
      />
    </div>
  </div>
</template>
