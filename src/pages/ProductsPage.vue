<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import ProductFeature from '@/components/product/ProductFeature.vue'
import ProductStatus from '@/components/product/ProductStatus.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import { clientBuiltProducts, flagshipProduct, ownedProducts } from '@/content/products'

usePageMeta({
  title: 'Products',
  description:
    'SOFORR develops and owns its own software products. Soforr Business OS is our flagship; Kujaaburun is a travel platform originating in The Gambia. Each product is shown with its real status.',
})

const otherOwned = ownedProducts.filter((p) => !p.flagship)
</script>

<template>
  <div>
    <PageHero
      label="Products"
      title="Software products, owned and built by SOFORR."
      lede="Alongside our engineering services, SOFORR develops independently owned software products. They are funded and operated by SOFORR, not built for a client. Each is shown with its real status."
    />

    <section class="section !pt-20 sm:!pt-28" aria-labelledby="flagship-title">
      <div class="container-page">
        <SectionLabel index="01" label="Flagship product" />
        <h2 id="flagship-title" class="sr-only">Flagship product</h2>
        <div class="mt-10">
          <ProductFeature :product="flagshipProduct" heading-level="h3" />
        </div>
      </div>
    </section>

    <section class="section border-t border-edge/[0.07] !pt-20 sm:!pt-28" aria-labelledby="more-products-title">
      <div class="container-page">
        <SectionLabel index="02" label="More products" />
        <h2 id="more-products-title" class="sr-only">More products</h2>
        <div class="mt-10 space-y-24 sm:space-y-32">
          <ProductFeature v-for="p in otherOwned" :key="p.slug" :product="p" flip />
        </div>
      </div>
    </section>

    <section class="section border-t border-edge/[0.07] !pt-20 sm:!pt-28" aria-labelledby="client-built-title">
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <SectionLabel index="03" label="Built for a client" />
          <h2 id="client-built-title" v-reveal="60" class="heading-xl mt-8">Not a SOFORR product, but worth explaining.</h2>
          <p v-reveal="120" class="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
            Some systems we develop are owned by the client they are built for. We list them so their ownership is never confused with our own products.
          </p>
        </div>
        <ul class="border-t border-edge/15 lg:col-span-7">
          <li v-for="p in clientBuiltProducts" :key="p.slug" v-reveal class="border-b border-edge/10 py-8">
            <div class="flex flex-wrap items-center gap-2">
              <ProductStatus :status="p.status" />
              <span class="border border-edge/15 px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-fg-muted">{{ p.ownership }}</span>
            </div>
            <h3 class="mt-5 text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-4xl">{{ p.name }}</h3>
            <p class="mt-3 text-lg leading-snug text-fg">{{ p.summary }}</p>
            <p class="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">{{ p.statusNote }}</p>
            <RouterLink :to="`/products/${p.slug}`" class="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-fg">
              <span class="border-b border-edge/30 pb-1 transition-colors group-hover:border-fg">View {{ p.name }}</span>
              <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <FinalCta title="Interested in" italic="our products?" body="Tell us which product you are interested in and what you would like to know. We will reply with an accurate account of where it stands." />
  </div>
</template>
