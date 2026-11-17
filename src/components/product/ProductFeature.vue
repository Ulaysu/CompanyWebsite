<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import type { Product } from '@/content/products'
import ProductMedia from '@/components/product/ProductMedia.vue'
import ProductStatus from '@/components/product/ProductStatus.vue'

/** A product told editorially: media beside the story. `flagship` makes it larger. */
defineProps<{ product: Product; flip?: boolean; headingLevel?: 'h2' | 'h3' }>()
</script>

<template>
  <article class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16" :aria-labelledby="`product-${product.slug}`">
    <RouterLink
      v-reveal
      :to="`/products/${product.slug}`"
      tabindex="-1"
      aria-hidden="true"
      class="reveal-clip group block overflow-hidden lg:col-span-7"
      :class="flip ? 'lg:order-2 lg:col-start-6' : ''"
    >
      <ProductMedia :product="product" class="transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" />
    </RouterLink>

    <div class="flex flex-col justify-center lg:col-span-5" :class="flip ? 'lg:order-1 lg:col-start-1' : ''">
      <div v-reveal class="flex flex-wrap items-center gap-2">
        <ProductStatus :status="product.status" />
        <span class="border border-edge/15 px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-fg-muted">{{ product.ownership }}</span>
        <span v-if="product.flagship" class="border border-fg/40 px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-fg">Flagship</span>
      </div>
      <component :is="headingLevel ?? 'h3'" :id="`product-${product.slug}`" v-reveal="60" class="mt-8 text-5xl font-semibold tracking-[-0.045em] text-fg sm:text-6xl">{{ product.name }}</component>
      <p v-reveal="80" class="mt-3 font-mono text-[0.6875rem] tracking-wide text-fg-subtle">{{ product.category }}</p>
      <p v-reveal="100" class="mt-5 text-xl leading-snug text-fg">{{ product.summary }}</p>
      <p v-reveal="120" class="mt-5 text-[0.9375rem] leading-relaxed text-fg-muted">{{ product.statusNote }}</p>

      <RouterLink
        v-reveal="180"
        :to="`/products/${product.slug}`"
        class="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-fg"
      >
        <span class="border-b border-edge/30 pb-1 transition-colors group-hover:border-fg">View {{ product.name }}</span>
        <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </RouterLink>
    </div>
  </article>
</template>
