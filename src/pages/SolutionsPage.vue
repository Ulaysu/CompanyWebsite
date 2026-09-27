<script setup lang="ts">
import { ChevronRight, Minus } from 'lucide-vue-next'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import SolutionFigure from '@/components/visuals/SolutionFigure.vue'
import CtaInline from '@/components/sections/CtaInline.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import { solutions } from '@/content/solutions'

usePageMeta({
  title: 'Solutions',
  description:
    'Examples of custom operational systems we build: equipment and fleet, property operations, wholesale and distribution, and business administration.',
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Solutions"
      title="A better system for the work behind the business."
      lede="These are examples of systems we can build — not products we sell. Every business runs differently, so each system is designed around the process it serves."
    />

    <section
      v-for="(s, i) in solutions"
      :id="s.id"
      :key="s.id"
      class="border-t border-edge/[0.06] py-20 sm:py-28"
      :aria-labelledby="`${s.id}-title`"
    >
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div :class="['lg:col-span-5', i % 2 ? 'lg:order-2' : '']">
          <p v-reveal class="font-mono text-xs text-fg-subtle">Example system · 0{{ i + 1 }}</p>
          <h2 :id="`${s.id}-title`" v-reveal="60" class="heading-xl text-gradient mt-4">{{ s.title }}</h2>
          <p v-reveal="100" class="mt-5 leading-relaxed text-fg-muted">{{ s.summary }}</p>

          <ol v-reveal="140" class="mt-8 flex flex-wrap items-center gap-1.5" :aria-label="`${s.title} workflow`">
            <template v-for="(f, j) in s.flow" :key="f">
              <li class="rounded-md border border-edge/10 px-2.5 py-1 font-mono text-xs text-fg-muted">{{ f }}</li>
              <ChevronRight v-if="j < s.flow.length - 1" class="size-3.5 text-fg-subtle" aria-hidden="true" />
            </template>
          </ol>

          <div v-reveal="180" class="mt-10">
            <h3 class="eyebrow mb-4">Problems it removes</h3>
            <ul class="space-y-2.5">
              <li v-for="p in s.problems" :key="p" class="flex items-center gap-2.5 text-[0.9375rem] text-fg-muted">
                <Minus class="size-3.5 text-accent" aria-hidden="true" />{{ p }}
              </li>
            </ul>
          </div>
        </div>
        <div v-reveal="120" :class="['lg:col-span-7', i % 2 ? 'lg:order-1' : '']">
          <SolutionFigure :solution="s" />
          <p class="mt-3 font-mono text-[0.625rem] text-fg-subtle">Illustrative scene and interface. Data shown is fictional.</p>
        </div>
      </div>
    </section>

    <div class="container-page pb-24 sm:pb-32">
      <CtaInline
        title="Your operation doesn't look like any of these?"
        body="Good. These are starting points. The system we build for you is shaped by your process."
        button="Describe your process"
      />
    </div>

    <FinalCta />
  </div>
</template>
