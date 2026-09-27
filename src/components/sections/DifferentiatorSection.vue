<script setup lang="ts">
import ProcessLine from '@/components/visuals/ProcessLine.vue'
import { discoveryQuestions, processSteps } from '@/content/process'
</script>

<template>
  <section class="py-24 sm:py-32" aria-labelledby="diff-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-5">
          <p v-reveal class="eyebrow mb-5 flex items-center gap-2"><span class="h-px w-5 bg-accent/70" />Our approach</p>
          <h2 id="diff-title" v-reveal="60" class="heading-xl text-gradient">
            We don't start with software. We start with the problem.
          </h2>
          <p v-reveal="120" class="lede mt-6">
            Before writing code, we understand how the business actually works.
          </p>
        </div>

        <div class="lg:col-span-6 lg:col-start-7">
          <div v-reveal class="panel overflow-hidden">
            <div class="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
              <span class="font-mono text-[0.6875rem] text-fg-subtle">discovery / questions</span>
              <span class="font-mono text-[0.6875rem] text-fg-subtle">{{ discoveryQuestions.length }}</span>
            </div>
            <ol>
              <li
                v-for="(q, i) in discoveryQuestions"
                :key="q"
                class="flex items-baseline gap-4 border-b border-white/[0.04] px-5 py-3.5 last:border-0"
              >
                <span class="font-mono text-[0.6875rem] text-fg-subtle tabular-nums">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="text-[0.9375rem] text-fg">{{ q }}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div class="mt-16 border-t border-white/[0.06] pt-12 sm:mt-20">
        <p v-reveal class="max-w-2xl text-xl leading-snug font-medium tracking-tight text-fg sm:text-2xl">
          Then we design the smallest useful system that removes the bottleneck.
        </p>
        <div v-reveal="100" class="mt-10">
          <ProcessLine :steps="processSteps.map((s) => s.title)" />
        </div>
      </div>
    </div>
  </section>
</template>
