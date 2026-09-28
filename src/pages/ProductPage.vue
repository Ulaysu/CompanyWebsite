<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-vue-next'
import { usePageMeta } from '@/composables/usePageMeta'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
import StatusBadge from '@/components/products/StatusBadge.vue'
import ProductCard from '@/components/products/ProductCard.vue'
import MoreComing from '@/components/products/MoreComing.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import { productBySlug, products } from '@/content/products'

const props = defineProps<{ slug: string }>()
const product = computed(() => productBySlug(props.slug)!)
const others = computed(() => products.filter((p) => p.slug !== props.slug))

usePageMeta({ title: product.value.name, description: product.value.summary })
</script>

<template>
  <div>
    <section class="surface-dark relative flex min-h-[82svh] flex-col overflow-hidden" aria-labelledby="page-title">
      <PhotoBackdrop :name="product.photo" eager fade="hero" sizes="100vw" />
      <div class="container-page relative flex flex-1 flex-col justify-end pt-36 pb-14 sm:pb-20">
        <RouterLink to="/products" class="inline-flex w-fit animate-fade-up items-center gap-2 font-mono text-xs text-fg-muted transition-colors hover:text-fg">
          <ArrowLeft class="size-3.5" aria-hidden="true" /> All products
        </RouterLink>
        <div class="mt-8 flex animate-fade-up flex-wrap items-center gap-2 [animation-delay:60ms]">
          <StatusBadge :status="product.status" />
          <span class="border border-edge/15 bg-ink-950/50 px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-fg-muted">{{ product.kind }}</span>
        </div>
        <h1 id="page-title" class="display mt-6 animate-fade-up pb-1 [animation-delay:120ms]">{{ product.name }}</h1>
        <p class="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-fg-muted [animation-delay:180ms] sm:text-xl">{{ product.summary }}</p>
      </div>
    </section>

    <section class="section" aria-label="Product details">
      <div class="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <aside class="lg:col-span-4">
          <dl class="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-edge/10 pt-6 lg:sticky lg:top-28 lg:grid-cols-1">
            <div>
              <dt class="eyebrow">Built by</dt>
              <dd class="mt-2 text-fg">SOFORR</dd>
            </div>
            <div>
              <dt class="eyebrow">Type</dt>
              <dd class="mt-2 text-fg">{{ product.kind }}</dd>
            </div>
            <div>
              <dt class="eyebrow">Category</dt>
              <dd class="mt-2 text-fg">{{ product.category }}</dd>
            </div>
            <div>
              <dt class="eyebrow">Status</dt>
              <dd class="mt-2 text-fg">{{ product.status }}</dd>
            </div>
            <div v-if="product.technology?.length">
              <dt class="eyebrow">Technology</dt>
              <dd class="mt-2 font-mono text-sm text-fg-muted">{{ product.technology.join(' · ') }}</dd>
            </div>
            <div v-if="product.url">
              <dt class="eyebrow">Link</dt>
              <dd class="mt-2">
                <a :href="product.url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-fg underline decoration-edge/25 underline-offset-4 hover:decoration-accent">
                  Visit <ArrowUpRight class="size-3.5" aria-hidden="true" />
                </a>
              </dd>
            </div>
          </dl>
        </aside>

        <div class="space-y-16 lg:col-span-7 lg:col-start-6">
          <div v-reveal>
            <h2 class="eyebrow">Why it exists</h2>
            <p class="mt-5 text-xl leading-relaxed text-fg sm:text-2xl sm:leading-relaxed">{{ product.context }}</p>
          </div>

          <div v-reveal>
            <h2 class="eyebrow">What we’re building</h2>
            <ul class="mt-6 divide-y divide-edge/10 border-y border-edge/10">
              <li v-for="(item, i) in product.building" :key="item" class="flex items-baseline gap-5 py-5">
                <span class="font-mono text-xs text-accent">0{{ i + 1 }}</span>
                <span class="text-lg text-fg">{{ item }}</span>
              </li>
            </ul>
          </div>

          <div v-reveal>
            <h2 class="eyebrow">Outcome</h2>
            <p v-if="product.outcome" class="mt-5 text-lg leading-relaxed text-fg">{{ product.outcome }}</p>
            <p v-else class="mt-5 border border-dashed border-edge/15 p-6 text-[0.9375rem] leading-relaxed text-fg-muted">
              {{ product.name }} is {{ product.status.toLowerCase() }}. We’ll publish outcomes here once there are real
              results to share, not before.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-edge/[0.07] py-20 sm:py-28" aria-labelledby="more-products">
      <div class="container-page">
        <h2 id="more-products" class="eyebrow mb-8">Also from SOFORR</h2>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ProductCard v-for="p in others" :key="p.slug" :product="p" />
          <MoreComing :next-index="products.length + 1" compact />
        </div>
      </div>
    </section>

    <FinalCta />
  </div>
</template>
