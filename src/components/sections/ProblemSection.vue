<script setup lang="ts">
import ProblemFlow from '@/components/visuals/ProblemFlow.vue'
import { manualWork } from '@/content/general'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop.vue'
</script>

<template>
  <section class="py-24 sm:py-32" aria-labelledby="problem-title">
    <div class="container-page">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-6">
          <p v-reveal class="eyebrow mb-5 flex items-center gap-2"><span class="h-px w-5 bg-accent/70" />The problem</p>
          <h2 id="problem-title" v-reveal="60" class="heading-xl text-gradient">
            Your business doesn't always fit inside the software you already have.
          </h2>
          <div v-reveal="120" class="lede mt-6 max-w-lg space-y-4">
            <p>Most businesses already use software.</p>
            <p class="text-fg">The problem is everything around it.</p>
          </div>
        </div>

        <div class="lg:col-span-5 lg:col-start-8 lg:pt-4">
          <figure v-reveal class="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl border border-edge/[0.07]">
            <PhotoBackdrop name="messy" fade="band" sizes="(min-width: 1024px) 480px, 100vw" alt="" />
            <figcaption class="absolute bottom-4 left-4 font-mono text-[0.6875rem] tracking-wide text-fg-muted">
              Where the work actually happens
            </figcaption>
          </figure>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="(item, i) in manualWork"
              :key="item"
              v-reveal="i * 50"
              class="rounded-full border border-dashed border-edge/12 px-3.5 py-1.5 text-sm text-fg-muted"
            >
              {{ item }}
            </li>
          </ul>
          <p v-reveal="200" class="mt-8 border-l-2 border-accent/70 pl-5 text-lg leading-relaxed text-fg">
            We build the software layer that connects those processes.
          </p>
        </div>
      </div>

      <div class="mt-16 sm:mt-20">
        <ProblemFlow />
      </div>
    </div>
  </section>
</template>
