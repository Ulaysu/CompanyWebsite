<script setup lang="ts">
import SectionHeader from '@/components/ui/SectionHeader.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { capabilities, softwareBelief } from '@/content/company'
</script>

<template>
  <section class="section border-t border-edge/[0.06]" aria-labelledby="capabilities-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <SectionHeader index="03" label="What we build" title="Products, platforms and the systems behind them." heading-id="capabilities-title" />
        </div>
        <p v-reveal="120" class="border-l-2 border-accent pl-5 text-lg leading-relaxed text-fg lg:col-span-4 lg:col-start-9">
          {{ softwareBelief }}
        </p>
      </div>

      <ul class="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-edge/[0.07] bg-edge/[0.07] sm:mt-20 md:grid-cols-2">
        <li v-for="(c, i) in capabilities" :key="c.id" v-reveal="(i % 2) * 90" class="group flex flex-col bg-ink-950 p-7 transition-colors duration-300 hover:bg-ink-900 sm:p-10">
          <div class="flex items-center justify-between">
            <span class="grid size-11 place-items-center rounded-xl border border-edge/10 bg-ink-900 transition-colors group-hover:border-signal/40">
              <component :is="c.icon" class="size-5 text-signal" aria-hidden="true" />
            </span>
            <span class="font-mono text-xs text-fg-subtle">0{{ i + 1 }}</span>
          </div>
          <h3 class="mt-6 text-2xl font-semibold sm:mt-10 tracking-[-0.025em] text-fg sm:text-[1.75rem]">{{ c.title }}</h3>
          <p class="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-fg-muted">{{ c.summary }}</p>
          <ul class="mt-8 hidden flex-wrap gap-2 sm:flex">
            <li v-for="e in c.examples" :key="e" class="rounded-full border border-edge/10 px-3 py-1 text-xs text-fg-muted">{{ e }}</li>
          </ul>
          <p class="mt-5 font-mono text-[0.6875rem] leading-relaxed text-fg-subtle sm:hidden">{{ c.examples.join(' · ') }}</p>
        </li>
      </ul>

      <div v-reveal class="mt-10">
        <AppButton to="/what-we-build" variant="ghost" arrow>How we build</AppButton>
      </div>
    </div>
  </section>
</template>
