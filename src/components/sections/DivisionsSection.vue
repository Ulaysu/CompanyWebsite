<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import { Check } from 'lucide-vue-next'
import { divisions } from '@/content/company'

/** The two business divisions with equal weight: one light panel, one navy. */
withDefaults(defineProps<{ index?: string }>(), { index: '' })
</script>

<template>
  <section class="section" aria-labelledby="divisions-title">
    <div class="container-page">
      <div class="max-w-3xl">
        <h2 id="divisions-title" class="heading-xl">Engineering for your business. Products of our own.</h2>
        <p class="lede mt-5 max-w-2xl">SOFORR builds software for other businesses and develops software it owns. Both are core to the company, and both are held to the same standard.</p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article
          v-for="(d, i) in divisions"
          :key="d.id"
          :aria-labelledby="`division-${d.id}`"
          class="flex flex-col rounded-3xl p-7 sm:p-10"
          :class="i === 0 ? 'card' : 'surface-dark'"
        >
          <h3 :id="`division-${d.id}`" class="text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-4xl">{{ d.title }}</h3>
          <p class="mt-3 text-lg text-fg">{{ d.summary }}</p>
          <p class="mt-4 leading-relaxed text-fg-muted">{{ d.body }}</p>
          <ul class="mt-7 space-y-3">
            <li v-for="pt in d.points" :key="pt" class="flex items-start gap-3 text-[0.9375rem] text-fg">
              <Check class="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />{{ pt }}
            </li>
          </ul>
          <div class="mt-auto flex flex-col gap-3 pt-9 sm:flex-row">
            <AppButton :to="d.cta.to" arrow>{{ d.cta.label }}</AppButton>
            <AppButton :to="d.secondary.to" variant="secondary">{{ d.secondary.label }}</AppButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
