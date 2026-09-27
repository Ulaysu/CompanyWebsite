<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import TechnologySection from '@/components/sections/TechnologySection.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import ImageBand from '@/components/sections/ImageBand.vue'
import { site } from '@/config/site'

usePageMeta({
  title: 'About',
  description: `${site.name} is a custom software studio combining software engineering with a practical understanding of how businesses operate.`,
})

const principles = [
  {
    title: 'Direct access to the engineer',
    body: 'You talk to the person designing and building your system. No account managers, no hand-offs, no lost context.',
  },
  {
    title: 'Operations first',
    body: 'We care about how work moves through your business: who does what, when, and with which information.',
  },
  {
    title: 'Practical scope',
    body: 'The goal is the smallest system that removes the bottleneck, delivered in working increments — not a sprawling project.',
  },
  {
    title: 'Built to last',
    body: 'Clean, conventional, well-documented engineering, so the system can be supported and extended for years.',
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="About"
      title="I like solving the parts of a business that existing software doesn't quite solve."
    />

    <ImageBand
      name="system"
      alt="Isometric model of a central system connected to payments, orders, inventory, CRM, documents and reporting modules."
      caption="The missing software layer: one system connected to the tools a business already uses."
      class="mb-20 sm:mb-28"
    />

    <section class="pb-24 sm:pb-32" aria-label="About the studio">
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-4">
          <div v-reveal class="panel p-6">
            <div class="flex items-center gap-4">
              <span class="grid size-14 place-items-center rounded-xl border border-edge/12 bg-gradient-to-b from-ink-700 to-ink-850 font-mono text-base font-semibold text-fg" aria-hidden="true">
                {{ site.monogram }}
              </span>
              <div>
                <p class="font-medium text-fg">{{ site.name }}</p>
                <p class="text-sm text-fg-subtle">Software engineer &amp; founder</p>
              </div>
            </div>
            <dl class="mt-6 space-y-3 border-t border-edge/[0.06] pt-5 text-sm">
              <div class="flex justify-between gap-4"><dt class="text-fg-subtle">Focus</dt><dd class="text-right text-fg-muted">Business systems &amp; automation</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-fg-subtle">Works with</dt><dd class="text-right text-fg-muted">Operational businesses</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-fg-subtle">Location</dt><dd class="text-right text-fg-muted">Remote · international</dd></div>
            </dl>
          </div>
        </div>

        <div class="space-y-6 text-lg leading-relaxed text-fg-muted lg:col-span-7 lg:col-start-6">
          <p v-reveal>
            Most businesses don't need more software. They need the software they have to fit the way
            they actually work — and something to fill the gaps where it doesn't.
          </p>
          <p v-reveal="60">
            Those gaps are where the real cost sits: the spreadsheet that holds the business together,
            the approvals that live in someone's inbox, the payments reconciled by hand at the end of the
            month, the information that has to be typed twice. That's the work I focus on.
          </p>
          <p v-reveal="120">
            {{ site.name }} is a small software studio that combines software engineering with an
            understanding of real operational workflows. I start by learning how the business runs,
            then design and build the internal systems, integrations and automation that remove the
            bottlenecks — carefully, incrementally, and with production-quality engineering underneath.
          </p>
          <p v-reveal="180" class="text-fg">
            The aim is simple: software that people in the business actually use, because it matches how
            they work.
          </p>
        </div>
      </div>

      <div class="container-page mt-20 sm:mt-28">
        <h2 v-reveal class="eyebrow mb-8">How the studio works</h2>
        <ul class="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-edge/[0.06] bg-edge/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(p, i) in principles" :key="p.title" v-reveal="i * 70" class="bg-ink-950 p-6">
            <h3 class="text-[0.9375rem] font-medium text-fg">{{ p.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-fg-muted">{{ p.body }}</p>
          </li>
        </ul>
      </div>
    </section>

    <TechnologySection />
    <FinalCta />
  </div>
</template>
