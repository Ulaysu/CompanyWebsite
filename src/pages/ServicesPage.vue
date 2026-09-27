<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/sections/PageHero.vue'
import ServiceVisual from '@/components/visuals/ServiceVisual.vue'
import CtaInline from '@/components/sections/CtaInline.vue'
import FinalCta from '@/components/sections/FinalCta.vue'
import { services } from '@/content/services'

usePageMeta({
  title: 'Services',
  description:
    'Custom business systems, automation and integrations, and operational software — built around how your business actually works.',
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Services"
      title="Software built around your operation."
      lede="Three ways we help: building the system you're missing, connecting the tools you already have, and turning complex day-to-day operations into a single place to work from."
    >
      <nav aria-label="Services on this page" class="mt-10 flex flex-wrap gap-2">
        <a
          v-for="s in services"
          :key="s.id"
          :href="`#${s.id}`"
          class="rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-fg-muted transition-colors hover:border-white/20 hover:text-fg"
        >
          <span class="mr-1.5 font-mono text-xs text-fg-subtle">{{ s.number }}</span>{{ s.title }}
        </a>
      </nav>
    </PageHero>

    <section
      v-for="(s, i) in services"
      :id="s.id"
      :key="s.id"
      class="border-t border-white/[0.06] py-20 sm:py-28"
      :aria-labelledby="`${s.id}-title`"
    >
      <div class="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div :class="['lg:col-span-6', i % 2 ? 'lg:order-2' : '']">
          <p v-reveal class="font-mono text-xs text-fg-subtle">{{ s.number }}</p>
          <h2 :id="`${s.id}-title`" v-reveal="60" class="heading-xl text-gradient mt-4">{{ s.title }}</h2>
          <p v-reveal="100" class="mt-4 text-lg text-fg">{{ s.summary }}</p>
          <p v-reveal="140" class="mt-4 leading-relaxed text-fg-muted">{{ s.description }}</p>

          <div v-reveal="180" class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 class="eyebrow mb-4">What we build</h3>
              <ul class="space-y-2.5">
                <li v-for="e in s.examples" :key="e" class="flex items-center gap-2.5 text-[0.9375rem] text-fg-muted">
                  <span class="size-1 rounded-full bg-white/30" aria-hidden="true" />{{ e }}
                </li>
              </ul>
            </div>
            <div>
              <h3 class="eyebrow mb-4">What changes</h3>
              <ul class="space-y-2.5">
                <li v-for="o in s.outcomes" :key="o" class="flex items-center gap-2.5 text-[0.9375rem] text-fg">
                  <Check class="size-4 text-accent" aria-hidden="true" />{{ o }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div v-reveal="120" :class="['group lg:col-span-6', i % 2 ? 'lg:order-1' : '']">
          <div class="panel bg-dots overflow-hidden">
            <div class="h-64 sm:h-80">
              <ServiceVisual :kind="s.visual" size="lg" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container-page pb-24 sm:pb-32">
      <CtaInline
        title="Not sure which of these you need?"
        body="Most projects involve a bit of all three. Describe the problem and we'll work out the right shape."
        button="Start a conversation"
      />
    </div>

    <FinalCta />
  </div>
</template>
