<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import type { Product } from '@/content/products'
import { photoSrc, photoSrcset, photos } from '@/content/photos'
import StatusBadge from '@/components/products/StatusBadge.vue'

/** A compact product tile. The photograph carries it; text sits on a scrim at the bottom. */
defineProps<{ product: Product }>()
</script>

<template>
  <RouterLink
    :to="`/products/${product.slug}`"
    class="surface-dark group relative flex aspect-[4/5] overflow-hidden outline-offset-4 sm:aspect-[4/3]"
  >
    <img
      loading="lazy"
      decoding="async"
      alt=""
      sizes="(min-width: 1024px) 50vw, 100vw"
      :srcset="photoSrcset(product.photo)"
      :src="photoSrc(product.photo)"
      class="absolute inset-0 h-full w-full object-cover [filter:saturate(0.85)_contrast(1.05)] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      :style="{ objectPosition: photos[product.photo]!.position }"
    />
    <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/10" />
    <div aria-hidden="true" class="frame-ticks absolute inset-4" />
    <div class="relative mt-auto flex w-full flex-col gap-4 p-6 sm:p-8">
      <div class="flex flex-wrap items-center gap-2">
        <StatusBadge :status="product.status" />
        <span class="border border-edge/15 bg-ink-950/50 px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-fg-muted backdrop-blur-sm">{{ product.kind }}</span>
      </div>
      <div>
        <p class="font-mono text-xs text-fg-subtle">{{ product.category }}</p>
        <h3 class="mt-2 flex items-center gap-3 text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-4xl">
          {{ product.name }}
          <ArrowUpRight class="size-6 text-fg-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" aria-hidden="true" />
        </h3>
        <p class="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-fg-muted">{{ product.summary }}</p>
      </div>
    </div>
  </RouterLink>
</template>
