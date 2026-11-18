<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import ProductStatus from '@/components/product/ProductStatus.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import { caseStudies } from '@/content/caseStudies'
import { ownedProducts } from '@/content/products'

usePageMeta({
  title: 'Our Work',
  description:
    'SOFORR’s own software products, shown separately from client engineering work. Client work is published only with the client’s permission.',
})
</script>

<template>
  <div>
    <PageHero
      label="Our Work"
      title="Our own products, and the work we do for clients."
      lede="We keep the two apart. Company-owned products are built and owned by SOFORR. Client work is built for someone else, and is published only with their permission."
    />

    <section class="section !pt-20 sm:!pt-28" aria-labelledby="own-title">
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <h2 id="own-title" v-reveal="60" class="heading-xl mt-8">Built and owned by SOFORR.</h2>
          <p v-reveal="120" class="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">These are our products, not client engagements.</p>
        </div>
        <ul class="border-t border-edge/15 lg:col-span-7">
          <li v-for="p in ownedProducts" :key="p.slug" v-reveal class="border-b border-edge/10 py-8">
            <div class="flex flex-wrap items-center gap-2">
              <ProductStatus :status="p.status" />
              <span v-if="p.flagship" class="rounded-full bg-fg px-2.5 py-1 text-xs leading-none text-ink-950">Flagship</span>
            </div>
            <h3 class="mt-5 text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-4xl">{{ p.name }}</h3>
            <p class="mt-3 text-lg leading-snug text-fg-muted">{{ p.summary }}</p>
            <RouterLink :to="`/products/${p.slug}`" class="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-fg">
              <span class="border-b border-edge/30 pb-1 transition-colors group-hover:border-fg">View {{ p.name }}</span>
              <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="section border-t border-edge/[0.07] !pt-20 sm:!pt-28" aria-labelledby="client-title">
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <h2 id="client-title" v-reveal="60" class="heading-xl mt-8">Built for clients.</h2>
          <p v-reveal="120" class="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
            Each case study sets out the customer’s problem, the scope, our engineering approach, technologies, implementation and outcomes. We publish a section only once it is true and approved, and we do not present work from previous employment or internships as SOFORR client work.
          </p>
        </div>
        <ul class="border-t border-edge/15 lg:col-span-7">
          <li v-for="c in caseStudies" :key="c.slug" v-reveal class="border-b border-edge/10 py-8">
            <p class="text-[0.6875rem] text-fg-subtle ">{{ c.sector }} · {{ c.status }}</p>
            <h3 class="mt-4 text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-4xl">{{ c.title }}</h3>
            <p class="mt-2 text-xs text-fg-subtle">Client: {{ c.client }}, {{ c.clientLocation }}</p>
            <p class="mt-4 text-lg leading-snug text-fg-muted">{{ c.summary }}</p>
            <RouterLink :to="`/our-work/${c.slug}`" class="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-fg">
              <span class="border-b border-edge/30 pb-1 transition-colors group-hover:border-fg">Read the case study</span>
              <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <FinalCta title="Want to be our" italic="next case study?" body="Tell us about your project. We publish client work only with permission, and only when it is true." />
  </div>
</template>
