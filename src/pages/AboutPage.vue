<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import AppButton from '@/components/ui/AppButton.vue'
import PhilosophySection from '@/components/sections/PhilosophySection.vue'
import FounderSection from '@/components/sections/FounderSection.vue'
import PrinciplesSection from '@/components/sections/PrinciplesSection.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import { direction, founder, globalReach, values } from '@/content/company'
import { site } from '@/config/site'

usePageMeta({
  title: 'About',
  description: `${site.name} is an international software engineering company founded in The Gambia by ${founder.name}, Founder and CEO. We deliver engineering services for businesses worldwide and build our own software products.`,
})
</script>

<template>
  <div>
    <PageHero
      label="About"
      title="A software engineering company from The Gambia, for the world."
      :lede="`SOFORR is an international software engineering company. It was founded in The Gambia by ${founder.name}, and it delivers engineering services and builds software products for businesses worldwide.`"
      photo="builders"
    />

    <section class="section !pt-20 sm:!pt-28" aria-labelledby="company-title">
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <h2 id="company-title" v-reveal="60" class="heading-xl mt-8">Two divisions, one engineering standard.</h2>
        </div>
        <div class="space-y-5 lg:col-span-6 lg:col-start-7">
          <p v-reveal class="text-xl leading-relaxed text-fg">{{ site.positioning }}</p>
          <p v-reveal="60" class="text-lg leading-relaxed text-fg-muted">
            Our engineering division builds software for other businesses on a commercial basis. Our products division owns and develops software of SOFORR’s own. They share engineers, practices and standards, and each strengthens the other.
          </p>
          <div v-reveal="100" class="flex flex-col gap-3 pt-4 sm:flex-row">
            <AppButton to="/engineering" variant="secondary" arrow>Engineering services</AppButton>
            <AppButton to="/products" variant="secondary" arrow>Our products</AppButton>
          </div>
        </div>
      </div>
    </section>

    <section class="section border-t border-edge/[0.07]" aria-labelledby="origin-title">
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <h2 id="origin-title" v-reveal="60" class="heading-xl mt-8">
            Founded in The Gambia.<br /><span class="text-fg-muted">Engineering for the world.</span>
          </h2>
        </div>
        <div class="lg:col-span-6 lg:col-start-7">
          <p v-reveal class="text-xl leading-relaxed text-fg">
            The Gambia is where SOFORR started, and where its philosophy comes from. It is not the limit of who the company serves or what it builds.
          </p>
          <p v-reveal="60" class="mt-5 text-lg leading-relaxed text-fg-muted">{{ globalReach.lede }}</p>
          <p v-reveal="100" class="mt-5 text-lg leading-relaxed text-fg-muted">
            Our ambition is to be recognised internationally as a software engineering company that is accountable for what it ships, and to own products that stand beside our services.
          </p>
        </div>
      </div>
    </section>

    <section class="section border-t border-edge/[0.07]" aria-labelledby="philosophy-engineering-title">
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <h2 id="philosophy-engineering-title" v-reveal="60" class="heading-xl mt-8">Engineering is how we help.</h2>
        </div>
        <div class="lg:col-span-6 lg:col-start-7">
          <p v-reveal class="text-xl leading-relaxed text-fg">
            We believe software earns its place by working: reliably, in production, for the people who depend on it.
          </p>
          <p v-reveal="60" class="mt-5 text-lg leading-relaxed text-fg-muted">
            That means building rather than only advising, owning outcomes after launch, and reporting status honestly. It is the same way we treat clients and our own products.
          </p>
        </div>
      </div>
    </section>

    <PhilosophySection index="04" />
    <FounderSection index="05" />

    <section class="section border-t border-edge/[0.07]" aria-labelledby="values-title">
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-4">
          <h2 id="values-title" v-reveal="60" class="heading-xl mt-8">What the company stands for.</h2>
        </div>
        <ol class="border-t border-edge/15 lg:col-span-8">
          <li v-for="(v, i) in values" :key="v.title" v-reveal="i * 60" class="grid grid-cols-[2rem_1fr] gap-x-3 gap-y-1 border-b border-edge/10 py-6 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.4fr)] sm:items-baseline sm:gap-6">
            <span class="text-[0.6875rem] text-fg-subtle">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="text-xl font-semibold tracking-[-0.025em] text-fg sm:text-2xl">{{ v.title }}</h3>
            <p class="col-start-2 text-[0.9375rem] leading-relaxed text-fg-muted sm:col-start-3">{{ v.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <PrinciplesSection index="07" />

    <section class="section border-t border-edge/[0.07]" aria-labelledby="direction-title">
      <div class="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <h2 id="direction-title" v-reveal="60" class="heading-xl mt-8">{{ direction.title }}</h2>
        </div>
        <div class="lg:col-span-6 lg:col-start-7 lg:pt-16">
          <p v-reveal class="text-xl leading-relaxed text-fg sm:text-2xl sm:leading-relaxed">{{ direction.body }}</p>
          <div v-reveal="80" class="mt-10"><AppButton to="/our-work" variant="secondary" arrow>See our work</AppButton></div>
        </div>
      </div>
    </section>

    <FinalCta />
  </div>
</template>
