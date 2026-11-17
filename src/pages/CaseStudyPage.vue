<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import AppButton from '@/components/ui/AppButton.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import { caseStudyBySlug } from '@/content/caseStudies'

const props = defineProps<{ slug: string }>()
const study = computed(() => caseStudyBySlug(props.slug)!)

usePageMeta({ title: `${study.value.title} case study`, description: `${study.value.summary} Client: ${study.value.client}. Status: ${study.value.status.toLowerCase()}.` })

/** Sections that have no published content yet are listed once, honestly, instead of rendered empty. */
const unpublished = computed(() =>
  [
    ['technologies', study.value.technologies],
    ['implementation', study.value.implementation],
    ['outcomes', study.value.outcomes],
  ]
    .filter(([, v]) => !(v as string[] | undefined)?.length)
    .map(([k]) => k as string),
)
</script>

<template>
  <div>
    <PageHero label="Case study" :title="study.title" :lede="study.summary" :photo="study.photo">
      <RouterLink to="/our-work" class="mt-8 inline-flex items-center gap-2 font-mono text-xs text-fg-muted transition-colors hover:text-fg">
        <ArrowLeft class="size-3.5" aria-hidden="true" /> All work
      </RouterLink>
    </PageHero>

    <section class="section" aria-label="Case study">
      <div class="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <aside class="lg:col-span-4">
          <dl class="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-edge/15 pt-6 lg:sticky lg:top-28 lg:grid-cols-1">
            <div><dt class="eyebrow">Client</dt><dd class="mt-2 text-fg">{{ study.client }}</dd></div>
            <div><dt class="eyebrow">Client location</dt><dd class="mt-2 text-fg">{{ study.clientLocation }}</dd></div>
            <div><dt class="eyebrow">Sector</dt><dd class="mt-2 text-fg">{{ study.sector }}</dd></div>
            <div><dt class="eyebrow">Status</dt><dd class="mt-2 text-fg">{{ study.status }}</dd></div>
            <div v-if="study.technologies?.length">
              <dt class="eyebrow">Technologies</dt>
              <dd class="mt-2 font-mono text-sm text-fg-muted">{{ study.technologies.join(' · ') }}</dd>
            </div>
          </dl>
        </aside>

        <div class="space-y-16 lg:col-span-7 lg:col-start-6">
          <div v-reveal>
            <h2 class="eyebrow">Customer problem</h2>
            <p class="mt-5 text-xl leading-relaxed text-fg sm:text-2xl sm:leading-relaxed">{{ study.problem }}</p>
          </div>

          <div v-reveal>
            <h2 class="eyebrow">Scope</h2>
            <ul class="mt-6 divide-y divide-edge/10 border-y border-edge/10">
              <li v-for="(item, i) in study.scope" :key="item" class="flex items-baseline gap-5 py-5">
                <span class="font-mono text-xs text-fg-subtle">0{{ i + 1 }}</span><span class="text-lg text-fg">{{ item }}</span>
              </li>
            </ul>
          </div>

          <div v-reveal>
            <h2 class="eyebrow">Engineering approach</h2>
            <ul class="mt-6 divide-y divide-edge/10 border-y border-edge/10">
              <li v-for="(item, i) in study.approach" :key="item" class="flex items-baseline gap-5 py-5">
                <span class="font-mono text-xs text-fg-subtle">0{{ i + 1 }}</span><span class="text-lg text-fg">{{ item }}</span>
              </li>
            </ul>
          </div>

          <div v-if="study.implementation?.length" v-reveal>
            <h2 class="eyebrow">Implementation</h2>
            <ul class="mt-6 divide-y divide-edge/10 border-y border-edge/10">
              <li v-for="item in study.implementation" :key="item" class="py-5 text-lg text-fg">{{ item }}</li>
            </ul>
          </div>

          <div v-if="study.outcomes?.length" v-reveal>
            <h2 class="eyebrow">Outcomes</h2>
            <ul class="mt-6 divide-y divide-edge/10 border-y border-edge/10">
              <li v-for="item in study.outcomes" :key="item" class="py-5 text-lg text-fg">{{ item }}</li>
            </ul>
          </div>

          <p v-if="unpublished.length" v-reveal class="border border-dashed border-edge/15 p-6 text-[0.9375rem] leading-relaxed text-fg-muted">
            This engagement is {{ study.status.toLowerCase() }}. The {{ unpublished.join(', ') }} will be published once they are final and approved by the client, not before.
          </p>

          <div v-reveal class="flex flex-col gap-3 sm:flex-row">
            <AppButton v-if="study.productSlug" :to="`/products/${study.productSlug}`" variant="secondary">View the system</AppButton>
            <AppButton to="/contact" arrow>Start a Project</AppButton>
          </div>
        </div>
      </div>
    </section>

    <FinalCta />
  </div>
</template>
