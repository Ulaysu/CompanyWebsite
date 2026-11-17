<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ProductMedia from '@/components/product/ProductMedia.vue'
import ProductStatus from '@/components/product/ProductStatus.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import { photos, photoSrc, photoSrcset } from '@/content/photos'
import { productBySlug, products } from '@/content/products'

const props = defineProps<{ slug: string }>()
const product = computed(() => productBySlug(props.slug)!)
const others = computed(() => products.filter((p) => p.slug !== props.slug))

usePageMeta({ title: product.value.name, description: `${product.value.summary} ${product.value.statusNote}` })
</script>

<template>
  <div>
    <PageHero :label="product.ownership === 'Owned by SOFORR' ? 'Product' : 'Built for a client'" :title="product.name" :lede="product.summary" :photo="product.photo">
      <div class="mt-8 flex flex-wrap items-center gap-2">
        <ProductStatus :status="product.status" />
        <span class="border border-edge/15 bg-ink-950/50 px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-fg-muted">{{ product.ownership }}</span>
        <span v-if="product.flagship" class="border border-fg/40 px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-fg">Flagship product</span>
      </div>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <AppButton :to="product.cta.to" size="lg" arrow>{{ product.cta.label }}</AppButton>
        <AppButton v-if="product.url" :href="product.url" variant="secondary" size="lg">Visit {{ product.name }}</AppButton>
      </div>
    </PageHero>

    <section class="section" aria-label="Product details">
      <div class="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <aside class="lg:col-span-4">
          <dl class="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-edge/15 pt-6 lg:sticky lg:top-28 lg:grid-cols-1">
            <div>
              <dt class="eyebrow">Status</dt>
              <dd class="mt-2 text-fg">{{ product.status }}</dd>
            </div>
            <div>
              <dt class="eyebrow">Ownership</dt>
              <dd class="mt-2 text-fg">{{ product.ownership }}</dd>
            </div>
            <div>
              <dt class="eyebrow">Category</dt>
              <dd class="mt-2 text-fg">{{ product.category }}</dd>
            </div>
            <div v-if="product.origin">
              <dt class="eyebrow">Origin</dt>
              <dd class="mt-2 text-fg">{{ product.origin }}</dd>
            </div>
            <div v-if="product.technology?.length">
              <dt class="eyebrow">Technology</dt>
              <dd class="mt-2 font-mono text-sm text-fg-muted">{{ product.technology.join(' · ') }}</dd>
            </div>
          </dl>
        </aside>

        <div class="space-y-16 lg:col-span-7 lg:col-start-6">
          <div v-reveal>
            <h2 class="eyebrow">About {{ product.name }}</h2>
            <p v-for="(para, i) in product.overview" :key="i" class="mt-5 text-xl leading-relaxed text-fg sm:text-2xl sm:leading-relaxed" :class="i > 0 ? 'text-fg-muted' : ''">{{ para }}</p>
          </div>

          <div v-reveal class="border border-edge/15 p-6">
            <h2 class="eyebrow">Status</h2>
            <p class="mt-3 text-[1.0625rem] leading-relaxed text-fg">{{ product.statusNote }}</p>
          </div>

          <figure v-if="!product.photo || product.illustration">
            <div v-reveal class="reveal-clip"><ProductMedia :product="product" /></div>
            <figcaption v-if="product.illustration" class="mt-3 font-mono text-[0.6875rem] text-fg-subtle">{{ product.illustration.caption }}</figcaption>
          </figure>
          <figure v-else-if="product.detailPhoto">
            <div v-reveal class="reveal-clip relative aspect-[16/10] overflow-hidden bg-ink-900">
              <img
                loading="lazy"
                decoding="async"
                :alt="photos[product.detailPhoto]!.alt"
                sizes="(min-width: 1024px) 55vw, 100vw"
                :srcset="photoSrcset(product.detailPhoto)"
                :src="photoSrc(product.detailPhoto)"
                class="absolute inset-0 h-full w-full object-cover"
                :style="{ objectPosition: photos[product.detailPhoto]!.position }"
              />
            </div>
            <figcaption class="mt-3 font-mono text-[0.6875rem] text-fg-subtle">Photograph: {{ photos[product.detailPhoto]!.alt }}</figcaption>
          </figure>

          <div v-if="product.principles?.length" v-reveal>
            <h2 class="eyebrow">{{ product.ownership === 'Owned by SOFORR' ? 'What we are building toward' : 'What is being built' }}</h2>
            <ul class="mt-6 divide-y divide-edge/10 border-y border-edge/10">
              <li v-for="(item, i) in product.principles" :key="item.title" class="grid grid-cols-[2rem_1fr] gap-x-4 py-5">
                <span class="font-mono text-xs text-fg-subtle">0{{ i + 1 }}</span>
                <span>
                  <span class="block text-lg text-fg">{{ item.title }}</span>
                  <span class="mt-1 block text-[0.9375rem] text-fg-muted">{{ item.body }}</span>
                </span>
              </li>
            </ul>
          </div>

          <div v-if="product.screenshots?.length" v-reveal>
            <h2 class="eyebrow">Screenshots</h2>
            <figure v-for="s in product.screenshots" :key="s.src" class="mt-6">
              <img :src="s.src" :alt="s.alt" :width="s.width" :height="s.height" loading="lazy" decoding="async" class="h-auto w-full border border-edge/10" />
              <figcaption v-if="s.caption" class="mt-2 font-mono text-[0.6875rem] text-fg-subtle">{{ s.caption }}</figcaption>
            </figure>
          </div>

          <div v-if="product.caseStudy" v-reveal>
            <h2 class="eyebrow">Engagement</h2>
            <p class="mt-4 text-[1.0625rem] leading-relaxed text-fg-muted">
              This system is client work. Read the problem, scope and approach in the
              <RouterLink :to="`/our-work/${product.caseStudy}`" class="text-fg underline decoration-edge/30 underline-offset-4 hover:decoration-fg">case study</RouterLink>.
            </p>
          </div>

          <div v-reveal class="flex flex-col gap-3 sm:flex-row">
            <AppButton :to="product.cta.to" arrow>{{ product.cta.label }}</AppButton>
            <AppButton to="/products" variant="secondary"><ArrowLeft class="size-4" aria-hidden="true" /> All products</AppButton>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-edge/[0.07] py-20 sm:py-28" aria-labelledby="more-products">
      <div class="container-page">
        <h2 id="more-products" class="eyebrow mb-8">Also from SOFORR</h2>
        <ul class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <li v-for="p in others" :key="p.slug">
            <RouterLink :to="`/products/${p.slug}`" class="group block border border-edge/10 p-6 transition-colors hover:border-edge/30">
              <p class="font-mono text-[0.6875rem] text-fg-subtle">{{ p.ownership }} · {{ p.status }}</p>
              <p class="mt-3 text-2xl font-semibold tracking-[-0.03em] text-fg">{{ p.name }}</p>
              <p class="mt-2 text-[0.9375rem] text-fg-muted">{{ p.summary }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <FinalCta title="Questions about" :italic="`${product.name}?`" body="Ask us about its status, direction or how it could fit your business." />
  </div>
</template>
