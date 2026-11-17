<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { caseStudies } from '@/content/caseStudies'
import { photoSrc, photoSrcset, photos } from '@/content/photos'

/** Selected client work. Only published, permitted case studies appear. */
withDefaults(defineProps<{ index?: string }>(), { index: '06' })
</script>

<template>
  <section class="surface-dark relative" aria-labelledby="selected-title">
    <div class="container-page section">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <SectionLabel :index="index" label="Selected work" />
          <h2 id="selected-title" v-reveal="60" class="heading-xl mt-8">Client work, shown honestly.</h2>
        </div>
        <p v-reveal="120" class="lede lg:col-span-4 lg:col-start-9">
          We publish client engagements only with the client’s permission, and we report their status as it is.
        </p>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-16">
        <article v-for="c in caseStudies" :key="c.slug" class="grid grid-cols-1 gap-8 lg:col-span-12 lg:grid-cols-12 lg:gap-16" :aria-labelledby="`case-${c.slug}`">
          <RouterLink v-if="c.photo" v-reveal :to="`/our-work/${c.slug}`" tabindex="-1" aria-hidden="true" class="reveal-clip group relative block aspect-[4/3] overflow-hidden bg-ink-900 lg:col-span-7">
            <img
              loading="lazy"
              decoding="async"
              alt=""
              sizes="(min-width: 1024px) 58vw, 100vw"
              :srcset="photoSrcset(c.photo)"
              :src="photoSrc(c.photo)"
              class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              :style="{ objectPosition: photos[c.photo]!.position }"
            />
          </RouterLink>
          <div class="flex flex-col justify-center lg:col-span-5">
            <p v-reveal class="font-mono text-[0.6875rem] tracking-[0.16em] text-fg-subtle uppercase">{{ c.sector }} · {{ c.status }}</p>
            <h3 :id="`case-${c.slug}`" v-reveal="60" class="mt-5 text-4xl font-semibold tracking-[-0.045em] text-fg sm:text-5xl">{{ c.title }}</h3>
            <p v-reveal="100" class="mt-3 font-mono text-xs text-fg-subtle">Client: {{ c.client }}, {{ c.clientLocation }}</p>
            <p v-reveal="120" class="mt-5 text-xl leading-snug text-fg-muted">{{ c.summary }}</p>
            <RouterLink v-reveal="160" :to="`/our-work/${c.slug}`" class="group/link mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-fg">
              <span class="border-b border-edge/30 pb-1 transition-colors group-hover/link:border-fg">Read the case study</span>
              <ArrowRight class="size-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
            </RouterLink>
          </div>
        </article>
      </div>

      <div v-reveal class="mt-16 flex flex-col gap-4 border-t border-edge/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p class="max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted">SOFORR’s own products are listed separately, on the Products page, and are not client work.</p>
        <AppButton to="/our-work" variant="secondary" arrow>See all work</AppButton>
      </div>
    </div>
  </section>
</template>
