<script setup lang="ts">
import SectionLabel from '@/components/ui/SectionLabel.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { divisions } from '@/content/company'

/** The two business divisions, side by side with equal weight. */
withDefaults(defineProps<{ index?: string }>(), { index: '01' })
</script>

<template>
  <section class="section" aria-labelledby="divisions-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-8">
          <SectionLabel :index="index" label="Two divisions" />
          <h2 id="divisions-title" v-reveal="60" class="heading-xl mt-8">One company. Two ways to build with us.</h2>
        </div>
        <p v-reveal="120" class="lede lg:col-span-4">
          SOFORR engineers software for other businesses, and develops and commercialises software products of its own. Both are core to the company.
        </p>
      </div>

      <div class="mt-16 grid grid-cols-1 border-t border-edge/15 sm:mt-24 lg:grid-cols-2">
        <article
          v-for="(d, i) in divisions"
          :key="d.id"
          v-reveal="i * 100"
          :aria-labelledby="`division-${d.id}`"
          class="flex flex-col border-b border-edge/15 py-10 sm:py-14 lg:border-b-0"
          :class="i === 0 ? 'lg:border-r lg:border-edge/15 lg:pr-14' : 'lg:pl-14'"
        >
          <span class="font-mono text-xs text-fg-subtle">{{ d.index }}</span>
          <h3 :id="`division-${d.id}`" class="mt-4 text-4xl font-semibold tracking-[-0.045em] text-fg sm:text-5xl">{{ d.title }}</h3>
          <p class="mt-5 text-xl leading-snug text-fg">{{ d.summary }}</p>
          <p class="mt-5 text-[1.0625rem] leading-relaxed text-fg-muted">{{ d.body }}</p>
          <ul class="mt-8 border-t border-edge/10">
            <li v-for="pt in d.points" :key="pt" class="flex items-baseline gap-3 border-b border-edge/10 py-3 text-[0.9375rem] text-fg">
              <span class="size-1 shrink-0 translate-y-[-2px] bg-fg-subtle" aria-hidden="true" />{{ pt }}
            </li>
          </ul>
          <div class="mt-auto flex flex-col gap-3 pt-10 sm:flex-row">
            <AppButton :to="d.cta.to" arrow>{{ d.cta.label }}</AppButton>
            <AppButton :to="d.secondary.to" variant="secondary">{{ d.secondary.label }}</AppButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
