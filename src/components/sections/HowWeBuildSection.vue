<script setup lang="ts">
import { buildProcess, engineeringFocus, stack } from '@/content/company'

withDefaults(defineProps<{ index?: string }>(), { index: '06' })
</script>

<template>
  <section class="section" aria-labelledby="how-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p v-reveal class="index-label"><span v-if="index" class="text-accent">{{ index }}</span><span class="h-px w-6 bg-edge/20" aria-hidden="true" />How we build</p>
          <h2 id="how-title" v-reveal="60" class="heading-xl mt-8">Engineered for the years after launch.</h2>
        </div>
        <p v-reveal="120" class="lede lg:col-span-4 lg:col-start-9">
          The same discipline for our own products and for our partners’: understand deeply, ship early, keep
          improving what is running in production.
        </p>
      </div>

      <!-- Process: one line, five stations. -->
      <ol class="relative mt-16 grid grid-cols-1 gap-10 sm:mt-24 sm:grid-cols-5 sm:gap-6" aria-label="Our process">
        <span aria-hidden="true" class="absolute top-[0.3125rem] right-0 left-0 hidden h-px bg-edge/15 sm:block" />
        <span aria-hidden="true" class="absolute top-0 bottom-0 left-[0.3125rem] w-px bg-edge/15 sm:hidden" />
        <li v-for="(step, i) in buildProcess" :key="step.title" v-reveal="i * 80" class="relative pl-8 sm:pl-0">
          <span aria-hidden="true" class="absolute top-0 left-0 size-2.5 border border-edge/40 bg-ink-950" :class="i === 0 ? '!border-accent !bg-accent' : ''" />
          <p class="font-mono text-xs text-fg-subtle sm:mt-8">0{{ i + 1 }}</p>
          <h3 class="mt-2 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-[1.625rem]">
            {{ step.title }}<span v-if="i < buildProcess.length - 1" class="ml-1.5 text-fg-subtle" aria-hidden="true">→</span>
          </h3>
          <p class="mt-3 max-w-[16rem] text-[0.9375rem] leading-relaxed text-fg-muted">{{ step.body }}</p>
        </li>
      </ol>

      <!-- What we focus on -->
      <div class="mt-24 grid grid-cols-1 gap-10 sm:mt-32 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <h3 v-reveal class="heading-lg">What we get right, every time.</h3>
          <p v-reveal="60" class="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-fg-muted">
            The parts of a system that decide whether it is still working, and still changeable, years from now.
          </p>
        </div>
        <ul class="grid grid-cols-1 border-t border-edge/10 sm:grid-cols-2 lg:col-span-8">
          <li
            v-for="(f, i) in engineeringFocus"
            :key="f.title"
            v-reveal="(i % 2) * 60"
            class="grid grid-cols-[2rem_1fr] gap-2 border-b border-edge/10 py-5 sm:pr-8 sm:even:pl-8 sm:even:pr-0"
          >
            <span class="pt-0.5 font-mono text-[0.6875rem] text-fg-subtle">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <p class="font-semibold text-fg">{{ f.title }}</p>
              <p class="mt-1 text-[0.9375rem] leading-relaxed text-fg-muted">{{ f.body }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- The stack: proof, not the headline. -->
      <div v-reveal class="mt-24 border border-edge/10 sm:mt-32">
        <div class="flex flex-col gap-2 border-b border-edge/10 px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:px-8">
          <h3 class="eyebrow !text-fg">The stack</h3>
          <p class="font-mono text-[0.6875rem] text-fg-subtle">What we build with, day to day</p>
        </div>
        <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(g, i) in stack"
            :key="g.group"
            class="border-edge/10 px-6 py-6 sm:px-8"
            :class="[i > 0 ? 'border-t sm:border-t-0' : '', i % 2 === 1 ? 'sm:border-l' : '', i >= 2 ? 'sm:border-t lg:border-t-0' : '', i > 0 ? 'lg:border-l' : '']"
          >
            <dt class="font-mono text-[0.6875rem] tracking-wide text-accent">{{ g.group }}</dt>
            <dd class="mt-4">
              <ul class="space-y-1.5 font-mono text-sm text-fg">
                <li v-for="t in g.items" :key="t">{{ t }}</li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
