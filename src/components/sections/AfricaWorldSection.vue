<script setup lang="ts">
import { africaToWorld } from '@/content/company'
import { globe } from '@/content/images'
</script>

<template>
  <section class="surface-dark relative overflow-hidden border-y border-edge/[0.06]" aria-labelledby="africa-world-title">
    <div aria-hidden="true" class="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_70%_at_70%_50%,#000_10%,transparent_75%)]" />
    <div class="container-page section relative grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
      <div class="order-2 lg:order-1 lg:col-span-5">
        <p v-reveal class="index-label"><span class="text-accent">04</span><span class="h-px w-6 bg-edge/20" aria-hidden="true" />Africa <span class="text-accent">→</span> World</p>
        <h2 id="africa-world-title" v-reveal="60" class="display mt-8 !text-[2.75rem] sm:!text-6xl lg:!text-7xl">
          <span class="text-gradient block pb-1">{{ africaToWorld.title[0] }}</span>
          <span class="block text-fg-muted">{{ africaToWorld.title[1] }}</span>
        </h2>
        <p v-reveal="120" class="lede mt-8 max-w-xl">{{ africaToWorld.lede }}</p>
        <ol class="mt-12 space-y-7">
          <li v-for="(pt, i) in africaToWorld.points" :key="pt.title" v-reveal="i * 90" class="grid grid-cols-[2.5rem_1fr] gap-2">
            <span class="pt-0.5 font-mono text-xs" :class="i === 0 ? 'text-accent' : 'text-signal'">0{{ i + 1 }}</span>
            <div>
              <h3 class="text-lg font-semibold tracking-[-0.015em] text-fg">{{ pt.title }}</h3>
              <p class="mt-1.5 text-[0.9375rem] leading-relaxed text-fg-muted">{{ pt.body }}</p>
            </div>
          </li>
        </ol>
      </div>

      <figure v-reveal class="order-1 -mx-5 lg:order-2 lg:col-span-7 lg:-mr-24 lg:ml-0">
        <img
          :src="globe.src"
          :srcset="globe.srcset"
          sizes="(min-width: 1024px) 60vw, 100vw"
          :width="globe.size"
          :height="globe.size"
          loading="lazy"
          decoding="async"
          alt="A globe centred on Africa, with network arcs travelling from West Africa to Europe, the Americas, the Middle East and Asia."
          class="mx-auto block h-auto w-full max-w-[52rem]"
        />
      </figure>
    </div>
  </section>
</template>
