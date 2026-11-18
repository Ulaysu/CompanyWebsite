<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import AppButton from '@/components/ui/AppButton.vue'
import MethodologySection from '@/components/sections/MethodologySection.vue'
import CapabilitiesSection from '@/components/sections/CapabilitiesSection.vue'
import PrinciplesSection from '@/components/sections/PrinciplesSection.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import { engagementModels, services } from '@/content/company'

usePageMeta({
  title: 'Engineering Services',
  description:
    'SOFORR delivers custom software development, backend and API engineering, dedicated engineering teams, cloud and DevOps, AI engineering and technical consulting for businesses worldwide.',
})
</script>

<template>
  <div>
    <PageHero
      label="Engineering"
      title="Software engineering services for businesses worldwide."
      lede="SOFORR designs, builds and runs software for organisations that need it done properly. Engage us for a defined project, an ongoing product, a dedicated team or independent technical advice."
      photo="servers"
    >
      <div class="mt-10 flex flex-col gap-3 sm:flex-row">
        <AppButton to="/contact?engagement=not-sure" size="lg" arrow>Start a Project</AppButton>
        <AppButton to="#services" variant="secondary" size="lg">See the services</AppButton>
      </div>
    </PageHero>

    <section id="services" class="section !pt-20 sm:!pt-28" aria-labelledby="services-title">
      <div class="container-page">
        <h2 id="services-title" class="heading-xl">Services</h2>
        <article
          v-for="(s, i) in services"
          :id="s.id"
          :key="s.id"
          class="grid scroll-mt-24 grid-cols-1 gap-8 border-t border-edge/10 py-14 first-of-type:mt-10 sm:py-20 lg:grid-cols-12 lg:gap-16"
        >
          <div v-reveal class="lg:col-span-5">
            <h3 class="text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-4xl">{{ s.title }}</h3>
            <p class="mt-6 max-w-md text-xl leading-snug text-fg">{{ s.summary }}</p>
          </div>
          <div v-reveal="100" class="lg:col-span-6 lg:col-start-7 lg:pt-12">
            <p class="text-lg leading-relaxed text-fg-muted">{{ s.description }}</p>
            <p class="eyebrow mt-8">What an engagement can include</p>
            <ul class="mt-3 border-t border-edge/10">
              <li v-for="e in s.includes" :key="e" class="flex items-baseline gap-3 border-b border-edge/10 py-3 text-[0.9375rem] text-fg">
                <span class="size-1 shrink-0 translate-y-[-2px] bg-fg-subtle" aria-hidden="true" />{{ e }}
              </li>
            </ul>
            <RouterLink to="/contact?engagement=not-sure" class="mt-6 inline-block border-b border-edge/30 pb-1 text-sm font-medium text-fg transition-colors hover:border-fg">
              Discuss this service
            </RouterLink>
          </div>
        </article>
      </div>
    </section>

    <section id="engagement-models" class="section bg-ink-900" aria-labelledby="models-title">
      <div class="container-page">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <h2 id="models-title" class="heading-xl">Four ways to work with us.</h2>
          </div>
          <p v-reveal="120" class="lede lg:col-span-4 lg:col-start-9">
            Pick the model that fits how well defined your work is. We will recommend one if you are unsure.
          </p>
        </div>
        <div class="mt-16 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-2">
          <article v-for="(m, i) in engagementModels" :id="m.id" :key="m.id" v-reveal="(i % 2) * 80" class="card scroll-mt-24 p-7 sm:p-9">
            <h3 class="text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">{{ m.title }}</h3>
            <p class="mt-3 text-lg leading-snug text-fg">{{ m.summary }}</p>
            <p class="mt-5 text-[0.9375rem] leading-relaxed text-fg-muted"><span class="text-fg">Best for:</span> {{ m.bestFor }}</p>
            <ul class="mt-6 border-t border-edge/10">
              <li v-for="h in m.how" :key="h" class="flex items-baseline gap-3 border-b border-edge/10 py-3 text-[0.9375rem] text-fg-muted">
                <span class="size-1 shrink-0 translate-y-[-2px] bg-fg-subtle" aria-hidden="true" />{{ h }}
              </li>
            </ul>
            <RouterLink :to="`/contact?engagement=${m.id}`" class="mt-6 inline-block border-b border-edge/30 pb-1 text-sm font-medium text-fg transition-colors hover:border-fg">
              Enquire about this model
            </RouterLink>
          </article>
        </div>
      </div>
    </section>

    <MethodologySection />
    <CapabilitiesSection />
    <PrinciplesSection />

    <FinalCta title="Have a project" italic="in mind?" body="Tell us what you need built, improved or reviewed. We will respond with questions, a view on approach and a recommended engagement model." />
  </div>
</template>
