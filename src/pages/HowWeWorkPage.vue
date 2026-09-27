<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import DifferentiatorSection from '@/components/sections/DifferentiatorSection.vue'
import ProcessOverview from '@/components/sections/ProcessOverview.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import ImageBand from '@/components/sections/ImageBand.vue'

usePageMeta({
  title: 'How We Work',
  description:
    'Understand, map, design, build, deploy, improve. A practical process for turning manual business workflows into dependable software.',
})

const engagement = [
  {
    title: 'A conversation about the problem',
    body: 'You describe what is slow, manual, or unclear. No specification required. We ask questions until we understand the process.',
  },
  {
    title: 'A short discovery',
    body: 'We map the workflow, the systems involved, and where time and money are lost. You get a clear written view of the problem.',
  },
  {
    title: 'A scoped proposal',
    body: 'A defined first phase with clear deliverables — the smallest useful system — so you can judge value before committing further.',
  },
]

const faqs = [
  {
    q: 'Do I need to know what software I need?',
    a: "No. Most conversations start with a problem, not a specification. Working out what should be built is part of what we do.",
  },
  {
    q: 'Will you replace the software we already use?',
    a: 'Usually not. If a tool does its job, we integrate with it. We build the missing layer around your existing systems and only replace things when that is clearly the better option.',
  },
  {
    q: 'Who owns the code and the data?',
    a: 'You do. The system is built for your business, and you keep full ownership of the source code, the infrastructure accounts, and your data.',
  },
  {
    q: 'Do you work with businesses outside your country?',
    a: 'Yes. We work remotely with businesses internationally, with regular written updates and scheduled calls across time zones.',
  },
  {
    q: 'What happens after launch?',
    a: 'Software that runs a business needs care. We offer ongoing support and continue improving the system as real usage shows what matters next.',
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="How we work"
      title="Understand the problem. Build the smallest system that solves it."
      lede="Good operational software comes from understanding the operation first. Our process is designed to reduce risk, show progress early, and put working software into real use."
    />

    <ImageBand
      name="process"
      :zoom="1.45"
      alt="Isometric model of six rising steps labelled Understand, Map, Design, Build, Deploy and Improve."
      caption="Six steps, each one building on the last."
    />

    <DifferentiatorSection />
    <ProcessOverview detailed />

    <section class="border-t border-edge/[0.06] py-24 sm:py-32" aria-labelledby="engage-title">
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-4">
          <p v-reveal class="eyebrow mb-5 flex items-center gap-2"><span class="h-px w-5 bg-accent/70" />Getting started</p>
          <h2 id="engage-title" v-reveal="60" class="heading-lg text-gradient">How an engagement begins.</h2>
        </div>
        <ol class="grid gap-px overflow-hidden rounded-xl border border-edge/[0.06] bg-edge/[0.06] lg:col-span-8">
          <li v-for="(e, i) in engagement" :key="e.title" v-reveal="i * 80" class="grid grid-cols-1 gap-3 bg-ink-950 p-6 sm:grid-cols-[3rem_1fr] sm:p-8">
            <span class="font-mono text-xs text-accent">0{{ i + 1 }}</span>
            <div>
              <h3 class="text-base font-medium text-fg">{{ e.title }}</h3>
              <p class="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{{ e.body }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="border-t border-edge/[0.06] py-24 sm:py-32" aria-labelledby="faq-title">
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-4">
          <p v-reveal class="eyebrow mb-5 flex items-center gap-2"><span class="h-px w-5 bg-accent/70" />Questions</p>
          <h2 id="faq-title" v-reveal="60" class="heading-lg text-gradient">Common questions.</h2>
        </div>
        <div class="divide-y divide-edge/[0.06] border-y border-edge/[0.06] lg:col-span-8">
          <details v-for="f in faqs" :key="f.q" class="group py-1">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium text-fg [&::-webkit-details-marker]:hidden">
              {{ f.q }}
              <Plus class="size-4 shrink-0 text-fg-subtle transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p class="max-w-2xl pb-6 text-[0.9375rem] leading-relaxed text-fg-muted">{{ f.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <FinalCta />
  </div>
</template>
